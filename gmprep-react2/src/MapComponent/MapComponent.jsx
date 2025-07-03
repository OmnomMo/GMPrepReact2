import React, { useContext, useEffect, useRef, useState } from 'react';
import './MapComponent.css';
import { GlobalContext } from '../Contexts';
import MapIconComponent from './MapIconComponent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllMapNodes, postMapNode } from '../Dialogues/Requests/MapNodeRequests';

let MAX_ZOOM = 10.0;




export default function MapComponent() {


	//#region queries
	const queryClient = useQueryClient();

	const {
		status,
		error,
		data: mapData,
	} = useQuery({
		queryKey: ['MapNodes', { mapId: 1 }],
		queryFn: getAllMapNodes,
	})

	const createMapNodeMutation = useMutation({
		mutationFn: postMapNode,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['MapNodes'] });
		}
	})
	//#endregion

	//draggingMap is provided by context, because we want to globally stop dragging map when releasing mouse anywhere.
	const { draggingMap, droppedNodeInfo, setDroppedNodeInfo } = useContext(GlobalContext);
	const dragStartPos = useRef({ x: 0.0, y: 0.0 });
	const originalPos = useRef({ x: 0.0, y: 0.0 });
	const mousePos = useRef({ x: 0, y: 0 });
	const mapDimensions = useRef({ x: 0, y: 0 });
	const sourceImageDimensions = useRef({ x: 0, y: 0 })

	const [zoom, setZoom] = useState(1.0);
	const [pos, setPos] = useState({ x: 0.0, y: 0.0 });
	//the map is active when the mouse is hovering over it
	const [active, setActive] = useState(false);

	//return scale factor of map when zoom = 1.0
	function getMapWidthFactor() {
		let widthFactor = mapDimensions.current.x / sourceImageDimensions.current.x
		return widthFactor;
	}


	//When Drag and Drop object drops a node, we create and post a new map node
	useEffect(() => {
		if (droppedNodeInfo.node != null && active) {
			console.log("Node Dropped");
			let centerOffsetX = droppedNodeInfo.location.x - window.innerWidth / 2;
			let centerOffsetY = droppedNodeInfo.location.y - window.innerHeight / 2;

			centerOffsetX = centerOffsetX / zoom;
			centerOffsetY = centerOffsetY / zoom;


			//Drop locations in window space
			let dropLocationX = window.innerWidth / 2 + centerOffsetX + pos.x;
			let dropLocationY = window.innerHeight / 2 + centerOffsetY + pos.y;

			//Drop Locations in map space
			dropLocationX = dropLocationX / getMapWidthFactor();
			dropLocationY = dropLocationY / getMapWidthFactor();

			createMapNodeMutation.mutate({
				data: {
					locationX: dropLocationX,
					locationY: dropLocationY,
					node: droppedNodeInfo.node,
				},
				mapId: 1,
			})
			setDroppedNodeInfo({ node: null, location: droppedNodeInfo.location })
		}
		if (droppedNodeInfo.node != null && !active) {
			setDroppedNodeInfo({ node: null, location: droppedNodeInfo.location })
		}
	}, [droppedNodeInfo, setDroppedNodeInfo, createMapNodeMutation, pos, zoom, active])

	//loads the background image for the map to determine it's original dimensions
	function cacheSourceImageDimensions(imgSrc) {
		let newImg = new Image();
		newImg.onload = function () {
			sourceImageDimensions.current = {
				x: newImg.width,
				y: newImg.height,
			}
		}
		newImg.src = imgSrc;

	}

	//#region navigation
	//updates position of map so zoom moves towards mouse pos
	function adjustZoomPosition(newZoom, zoomDir = 1.0) {
		let zoomOffset = {
			x: window.innerWidth / 2 - mousePos.current.x,
			y: window.innerHeight / 2 - mousePos.current.y
		};


		setPos(prev => {
			return {
				x: prev.x - zoomDir * zoomOffset.x / (newZoom * 4),
				y: prev.y - zoomDir * zoomOffset.y / (newZoom * 4)
			}
		})
	}

	function zoomOut() {

		let newZoom = Math.max(zoom * 0.8, 1.0)

		setZoom(newZoom);

		if (newZoom <= 1.0) {
			return;
		}

		adjustZoomPosition(newZoom, -1.0);
	}

	function zoomIn() {

		let newZoom = Math.min(zoom * 1.2, MAX_ZOOM)

		setZoom(newZoom);

		if (newZoom >= MAX_ZOOM) {
			return;
		}

		adjustZoomPosition(newZoom);


	}

	function mouseMoveEvent(e) {

		mousePos.current = { x: e.clientX, y: e.clientY };

		if (!draggingMap.current) {
			return;
		}
		let dragOffset = { x: dragStartPos.current.x - e.clientX, y: dragStartPos.current.y - e.clientY };
		let posX = originalPos.current.x + dragOffset.x * (1 / zoom);
		let posY = originalPos.current.y + dragOffset.y * (1 / zoom);

		setPos({ x: posX, y: posY });
	}

	function startDrag(startPos) {
		draggingMap.current = true;
		originalPos.current = pos;
		dragStartPos.current = startPos;
	}
	//#endregion



	return (
		<div id="MapContainer" className='absolute bg-black top-0 left-0 overflow-clip'
			style={{ width: `${window.innerWidth}px`, height: `${window.innerHeight}px` }}>
			{/*<div className="absolute top-0 left-0 z-9999 bg-red-500  p-1">Active: {active.toString()}</div>*/}
			<div
				className='map'
				style={{
					transformOrigin: `${window.innerWidth / 2 + pos.x}px ${window.innerHeight / 2 + pos.y}px`,
					transform: `translate(${pos.x * -1}px, ${pos.y * -1}px) scale(${zoom})`,
				}}
				onMouseMove={mouseMoveEvent}
				onMouseDown={e => {
					console.log("Map onmousedown")
					startDrag({ x: e.clientX, y: e.clientY });
				}}
				onWheelCapture={e => {
					if (e.deltaY > 0) {
						zoomOut();
					} else {
						zoomIn();
					}
				}}
				onMouseEnter={() => {
					setActive(true);
				}}
				onMouseLeave={() => {
					setActive(false)
				}}
			>
				<img
					src="/maps/resolutions_1200.jpg"
					id="mapBackground"
					draggable='false'

					onLoad={(e) => {
						cacheSourceImageDimensions(e.target.src);
						mapDimensions.current = {
							x: e.target.width,
							y: e.target.height,
						}
					}}
				/>
				{mapData && mapData.map((mapNodeData) => {
					return <MapIconComponent
						mapNodeData={mapNodeData}
						mapHeight={mapDimensions.current.y}
						posX={mapNodeData.locationX * getMapWidthFactor()}
						posY={mapNodeData.locationY * getMapWidthFactor()}
						scaleFactor={getMapWidthFactor()}
						key={mapNodeData.locationX + " " + mapNodeData.locationY + " " + mapNodeData.node.displayName}
					/>
				})}
				{status == 'error' && <div id="ErrorLoadingMapData">Error Loading Map Data! {error}</div>}


			</div>
		</div>)
}