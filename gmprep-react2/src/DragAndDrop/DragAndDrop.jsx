import { useContext, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import './DragAndDrop.css'
import { GlobalContext } from "../Contexts";

export default function DragAndDrop() {
	const element = useRef({});
	const { draggedNode, setDraggedNode, setDroppedNodeInfo } = useContext(GlobalContext)

	useEffect(() => {
		window.addEventListener('mouseup', handleMouseUp, false);

		function handleMouseUp(e) {
			setDroppedNodeInfo({
				node: draggedNode,
				location: { x: e.clientX, y: e.clientY },
			})
			setDraggedNode(null);
		}

		return () => window.removeEventListener('mouseup', handleMouseUp)
}, [setDroppedNodeInfo, setDraggedNode, draggedNode]);


useEffect(() => {
	function handler(e) {
		if (element.current) {
			if (draggedNode) {
				const size = draggedNode.mapIconSize;
				const x = e.clientX - size / 2, y = e.clientY - size / 2;
				element.current.style.transform = `translate(${x}px, ${y}px)`;
				element.current.style.visibility = 'visible';
				element.current.style.width = `${size}px`;
				element.current.style.height = `${size}px`;
				element.current.src = "/icons/default/" + draggedNode.mapIconPath;
			}
		}
	}

	if (!draggedNode) {
		element.current.style.visibility = 'hidden';
	}
	document.addEventListener('mousemove', handler);
	return () => document.removeEventListener('mousemove', handler);
}, [draggedNode]);


return createPortal(
	<img
		ref={element}
		src="/icons/default/wyvern.png"
		className="mouse-tracker"
		/>,
	document.body
);
}