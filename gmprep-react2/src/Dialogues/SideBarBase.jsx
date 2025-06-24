import { useEffect, useRef, useState } from "react";

const SIDEBAR_MIN_WIDTH = 450;
const SIDEBAR_MAX_WIDTH = 1000;


//Sidebar with variable (user defined width)
export default function SidebarBase({children}) {
	const [sidebarWidth, setSidebarWidth] = useState(450);
	const isResized = useRef(false);



	useEffect(() => {
		window.addEventListener("mousemove", (e) => {
			if (!isResized.current) {
				return;
			}

			setSidebarWidth((previousWidth) => {
				let newWidth = previousWidth + e.movementX / -2;
				return Math.max( SIDEBAR_MIN_WIDTH, Math.min(SIDEBAR_MAX_WIDTH, newWidth));
			});
		});
	}, []);

	window.addEventListener("mouseup", () => {
		isResized.current = false;
		document.removeEventListener('selectstart', onStartSelect)
	});

	function onStartSelect(e) {
		e.preventDefault();
		return false;
	}

	return <>
		<aside id="sidebar" className="fixed top-0 right-0 z-40 h-screen bg-gray-900 flex " style={{ width: `${sidebarWidth / 16}rem` }}>
			<div id="resizeHandle" className="bg-gray-400 relative h-screen left-0 w-2 cursor-ew-resize" onMouseDown={() => {
				//disables selection of text until mouse up
				document.addEventListener('selectstart', onStartSelect)
				isResized.current = true;
			}}>
			</div>
			<div id="content" className="p-10 w-full overflow-y-auto">
				{children}
			</div>
		</aside>
	</>

}