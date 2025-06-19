import { useEffect, useRef, useState } from "react";
import CharacterInfoFormComponent from "./CharacterInfoFormComponent";
import LocationInfoFormComponent from "./LocationInfoFormComponent";
import SecretsFormComponent from "./SecretsFormComponent";


const SIDEBAR_MIN_WIDTH = 300;
const SIDEBAR_MAX_WIDTH = 800;

export default function NewNodeSidebar() {
	const [inputs, setInputs] = useState({});
	const [sidebarWidth, setSidebarWidth] = useState(400);
	const isResized = useRef(false);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({ ...values, [name]: value }));
		let test = inputs.displayName;
		test;
	}

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
	});

	return <>
		<aside id="sidebar" className="fixed top-0 right-0 z-40 h-screen bg-blue-950 flex " style={{ width: `${sidebarWidth / 16}rem` }}>
			<div id="resizeHandle" className="bg-red-500 relative h-screen left-0 w-2" onMouseDown={() => {
				isResized.current = true;
			}}>
			</div>
			<div id="content" className="p-10">
				<button className="w3-bas-item w3-button w3-wide-large">Close</button>

				<form>
					<div>
						<label>Name: </label>
						<input type="text" name="displayName" defaultValue={inputs.displayName ?? "Name"} onChange={handleChange} />
					</div>
					<div>
						<label>Description: </label>
						<textarea name="nodeDescription" defaultValue={inputs.nodeDescription ?? ""} onChange={handleChange} />
					</div>
					<div>
						<img src={"/icons/default/" + (inputs.portraitPath | "alien-bug.png")} width="64" height="64" />
						<button className="aspect-1/1">Select Icon</button>
					</div>
					<select defaultValue={inputs.mapIconSize ?? "64"} name="mapIconSize" onChange={handleChange}>
						<option value="32">32</option>
						<option value="64">64</option>
						<option value="96">96</option>
					</select>

					<CharacterInfoFormComponent />
					<LocationInfoFormComponent />
					<SecretsFormComponent />
				</form>
			</div>
		</aside>
	</>

}