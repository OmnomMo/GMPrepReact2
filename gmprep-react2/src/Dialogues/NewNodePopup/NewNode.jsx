import {useState } from "react";
import CharacterInfoFormComponent from "./CharacterInfoFormComponent";
import LocationInfoFormComponent from "./LocationInfoFormComponent";
import SecretsFormComponent from "./SecretsFormComponent";
import EditeableText from "../../EditeableFields/EditeableText";
import EditeableMultiline from "../../EditeableFields/EditeableMultiline";
import IconPicker from "../../EditeableFields/IconPicker";



export default function NewNode() {
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({ ...values, [name]: value }));
		let test = inputs.displayName;
		test;
	}



	return <div className="w-full">
			<div>
				<IconPicker onChanged={(icon) => console.log(icon)} defaultIcon="well.png"/>
			</div>
			<div>
				<EditeableText defaultValue="Default Name" onChanged={(newText) => console.log(newText)}/>
			</div>
			<div>
				<EditeableMultiline defaultValue="" onChanged={(newDescription) => console.log(newDescription)} labelName="Description:"/>
			</div>
			<select defaultValue={inputs.mapIconSize ?? "64"} name="mapIconSize" onChange={handleChange}>
				<option value="32">32</option>
				<option value="64">64</option>
				<option value="96">96</option>
			</select>

			<CharacterInfoFormComponent />
			<LocationInfoFormComponent />
			<SecretsFormComponent />
	</div>

}