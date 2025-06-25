import { useRef } from "react";
import EditeableMultiline from "../../EditeableFields/EditeableMultiline";

export default function LocationInfoFormComponent({defaultLocationData, onChange}) {

	const locationData = useRef(defaultLocationData);

	function updateLocationData(key, value) {
		let tempData = locationData.current;
		tempData[key] = value;
		locationData.current = tempData;
		onChange(locationData.current);
	}

	return (
		<>
		<EditeableMultiline labelName={"Location Info"} defaultValue={"Inhabitants: "} onChanged={newValue => {updateLocationData("Population", newValue);}}/>
		</>
	)
}