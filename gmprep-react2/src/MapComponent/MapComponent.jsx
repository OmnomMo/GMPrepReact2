import React, { useContext, useRef, useState } from 'react';
import './MapComponent.css';
import { NodeContext } from '../Contexts';



export default function MapComponent() {

	//draggingMap is provided by context, because we want to globally stop dragging map when releasing mouse anywhere.
	const { draggingMap } = useContext(NodeContext);
	const dragStartPos = useRef({ x: 0.0, y: 0.0 });
	const originalPos = useRef({ x: 0.0, y: 0.0 });

	const [zoom, setZoom] = useState(1.0);
	const [pos, setPos] = useState({ x: 0.0, y: 0.0 });

	function getMapResolution() {
		let image = document.getElementById("mapBackground");

		return { x: image.width, y: image.height };
	}

	function getSourceImageResolution() {

		let image = document.getElementById("mapBackground");

		return { x: image.naturalWidth, y: image.naturalHeight };
	}



	function setMapStartPos() {
		let size = getSourceImageResolution();
		setPos({ x: size.x / 2, y: size.y / 2 });
	}

	function mouseMoveEvent(e) {

		if (!draggingMap.current) {
			return;
		}
		let dragOffset = { x: dragStartPos.current.x - e.clientX, y: dragStartPos.current.y - e.clientY };
		let posX = originalPos.current.x + dragOffset.x;
		let posY = originalPos.current.y + dragOffset.y;
		posX = Math.max(posX, 0);
		posX = Math.min(posX, getSourceImageResolution().x - getMapResolution().x);
		posY = Math.max(posY, 0);
		posY = Math.min(posY, getSourceImageResolution().y - getMapResolution().y);

		setPos({ x: posX, y: posY});
	}

	function startDrag(startPos) {
		draggingMap.current = true;
		originalPos.current = pos;
		dragStartPos.current = startPos;
	}

	return (
		<div id="MapContainer" className='fixed w-full h-full left-0 top-0'>
			<img
				src="/maps/testmap.jpg"
				id="mapBackground"
				className='map'
				draggable='false'
				style={{ objectPosition: `-${pos.x}px -${pos.y}px` }}
				onLoad={() => {
					setMapStartPos();
				}}

				onMouseMove={mouseMoveEvent}
				onMouseDown={e => {
					startDrag({ x: e.clientX, y: e.clientY });
				}}
				onWheelCapture={e => {
					if (e.deltaY > 0) {
						setZoom(prev => prev + 0.1);
					} else {
						setZoom(prev => prev - 0.1);
					}
				}}
			/>
		</div>)
}