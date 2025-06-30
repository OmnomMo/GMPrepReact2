import React, { useContext, useRef, useState } from 'react';
import './MapComponent.css';
import { NodeContext } from '../Contexts';

let MAX_ZOOM = 10.0;

export default function MapComponent() {

	//draggingMap is provided by context, because we want to globally stop dragging map when releasing mouse anywhere.
	const { draggingMap } = useContext(NodeContext);
	const dragStartPos = useRef({ x: 0.0, y: 0.0 });
	const originalPos = useRef({ x: 0.0, y: 0.0 });
	const mousePos = useRef({ x: 0, y: 0 });

	const [zoom, setZoom] = useState(1.0);
	const [pos, setPos] = useState({ x: 0.0, y: 0.0 });


	function zoomOut() {
		setZoom(prev => Math.max(prev * 0.8, 1.0));
	}

	function zoomIn() {

		let newZoom = Math.min(zoom * 1.2, 10.0)

		setZoom(newZoom);
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

	return (
		<div id="MapContainer" className='absolute bg-black top-0 left-0 overflow-clip'
			style={{ width: `${window.innerWidth}px`, height: `${window.innerHeight}px` }}>
			<img
				src="/maps/testmap.jpg"
				id="mapBackground"
				className='map'
				draggable='false'
				style={{
					objectPosition: `${pos.x * -1}px ${pos.y * -1}px`,
					scale: `${zoom}`,
					transformOrigin: `${mousePos.current.x}px ${mousePos.current.y}px`
				}}

				onMouseMove={mouseMoveEvent}
				onMouseDown={e => {
					startDrag({ x: e.clientX, y: e.clientY });
				}}
				onWheelCapture={e => {
					if (e.deltaY > 0) {
						zoomOut();
					} else {
						zoomIn();
					}
				}}
			/>
		</div>)
}