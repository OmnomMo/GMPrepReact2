import { useEffect, useRef, useState } from "react";

const SIDEBAR_MIN_WIDTH = 450;
const SIDEBAR_MAX_WIDTH = 1000;


//Sidebar with variable (user defined width)
export default function SidebarBase({children, rightSide=true}) {
	const [sidebarWidth, setSidebarWidth] = useState(450);
	const isResized = useRef(false);



	useEffect(() => {
		window.addEventListener("mousemove", (e) => {
			if (!isResized.current) {
				return;
			}

			setSidebarWidth((previousWidth) => {
				let dirFactor = rightSide ? -2 : 2;
				let newWidth = previousWidth + e.movementX / dirFactor;
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

	let sidebarDir = rightSide ? "sidebar rightSide" : "sidebar leftSide";
	let handleDir = rightSide ? "sidebarHandle leftSide" : "sidebarHandle rightSide";

	return <>
		<aside id="sidebar" className={sidebarDir} style={{ width: `${sidebarWidth / 16}rem`}}>
			<div id="resizeHandle" className={handleDir} onMouseDown={() => {
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