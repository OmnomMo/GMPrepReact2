import {useState } from "react";
import CharacterInfoFormComponent from "./CharacterInfoFormComponent";
import LocationInfoFormComponent from "./LocationInfoFormComponent";
import SecretsFormComponent from "./SecretsFormComponent";
import EditeableText from "../../EditeableFields/EditeableText";
import EditeableMultiline from "../../EditeableFields/EditeableMultiline";
import IconPicker from "../../EditeableFields/IconPicker";
import EditeableHeader from "../../EditeableFields/EditeableHeader";



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
				<IconPicker onChanged={(dialogResult) => {console.log(dialogResult.icon + dialogResult.iconSize)}} defaultIcon="well.png"/>
			</div>
			<div>
				<EditeableHeader defaultValue="Default Name" onChanged={(newText) => console.log(newText)}/>
			</div>
			<div>
				<EditeableMultiline defaultValue="" onChanged={(newDescription) => console.log(newDescription)} labelName="Description:"/>
			</div>

			<CharacterInfoFormComponent />
			<LocationInfoFormComponent />
			<SecretsFormComponent />
	</div>

}