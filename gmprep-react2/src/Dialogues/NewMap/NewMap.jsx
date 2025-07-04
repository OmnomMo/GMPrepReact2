import { useRef, useState } from "react";
import EditeableHeader from "../../EditeableFields/EditeableHeader";
import EditeableMultiline from "../../EditeableFields/EditeableMultiline";
import { mapBackgrounds } from "../../Globals/MapBackgrounds";
import MapBackgroundButton from "./MapBackgroundButton";



export default function NewMap({ onCancel, onSubmit }) {

	const name = useRef("Map Name");
	const description = useRef("");
	const [mapBackgroundPath, setMapBackgroundPath] = useState("");
	const mapBackgroundUrl = useRef("");

	const canSubmit = mapBackgroundPath != "";

	function onNameChanged(newName) {
		name.current = newName;
	}

	function onDescriptionChanged(newDescription) {
		description.current = newDescription
	}

	function onMapBackgroundSelected(newPath) {
		setMapBackgroundPath(newPath);
	}

	mapBackgrounds.map(bg => console.log(bg));

	return (<>
		<h1>CREATE NEW MAP</h1>
		<div>
			<EditeableHeader defaultValue={"Map Name"} onChanged={onNameChanged}/>
			<EditeableMultiline labelName={"Description"} defaultValue={""} onChanged={onDescriptionChanged}/>
			<h4 className="text-left m-1 mt-4">Select background image:</h4>
			<div id="MapBackgroundSelection" className="flex flex-wrap bg-gray-800  p-2">
				{mapBackgrounds.map(bg => {
					return <MapBackgroundButton src={bg} key={bg} onSelected={onMapBackgroundSelected} isSelected={mapBackgroundPath == bg}/>;
				})}
			</div>
			<button
				onClick={() => {onCancel();}}
			>Cancel</button>
			{!canSubmit && <button disabled style={{
				opacity: "0.5",
			}}>Submit</button>}
			{canSubmit && <button
				onClick={() => {
					onSubmit(
						{name: name.current,
						description: description.current,
						imagePath: mapBackgroundPath,
					});
				}}
			>Submit</button>}
		</div>
	</>
	);
}