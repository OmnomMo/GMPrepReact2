import { useEffect, useState } from "react";
import CharacterInfoFormComponent from "./CharacterInfoFormComponent";
import LocationInfoFormComponent from "./LocationInfoFormComponent";
import EditeableText from "../../EditeableFields/EditeableText";
import EditeableMultiline from "../../EditeableFields/EditeableMultiline";
import IconPicker from "../../EditeableFields/IconPicker";
import EditeableHeader from "../../EditeableFields/EditeableHeader";
import TypeAlignmentComponent from "./TypeAlignmentComponent";
import EditeableList from "../../EditeableFields/EditeableList";
import Secret from "./Secret";



export default function NewNode() {

	const [nodeData] = useState({});

	const [isCharacter, setIsCharacter] = useState(false);
	const [isLocation, setIsLocation] = useState(false);

	//Push data into nodeData at first render 
	useEffect(() => {
		nodeData.isCharacter = isCharacter;
		nodeData.isLocation = isLocation;
	}, [])

	return <div className="w-full ">
		<div className="flexRow  mb-4">

			<label className="toggleButton m-2">
				<input
					type="checkbox"
					name="isCharacter"
					checked={isCharacter}
					onChange={e => {
						nodeData.isCharacter = e.target.checked;
						setIsCharacter(e.target.checked);
					}}
				/>
				<span className="toggleBG"><img src="/icons/ui/character_icon.png" className="p-1"/></span>
			</label>
			<label className="toggleButton m-2">
				<input
					type="checkbox"
					name="isLocation"
					checked={isLocation}
					onChange={e => {
						nodeData.isLocation = e.target.checked;
						setIsLocation(e.target.checked);
					}}
				/>
				<span className="toggleBG"><img src="/icons/ui/location_icon.png" className="p-1" /></span>
			</label>
		</div>
		<div>
			<IconPicker
				onChanged={(dialogResult) => {
					nodeData.icon = dialogResult.icon;
					nodeData.iconSize = dialogResult.iconSize; }}
				defaultIcon="well.png"
			/>
		</div>
		<div>
			<EditeableHeader defaultValue="Default Name" onChanged={(newText) => nodeData.displayName = newText} />
		</div>
		{isCharacter && <div>
			<TypeAlignmentComponent
				defaultSize="Medium"
				defaultType="Humanoid"
				defaultAlignment={"Neutral Good"}
				onChange={values => {
					if (!("characterData" in nodeData)) {
						nodeData.characterData = {};
					}
					nodeData.characterData.type = values.type;
					nodeData.characterData.size = values.size;
					nodeData.characterData.alignment = values.alignment;
				}}/>
		</div>}
		<div>
			<EditeableMultiline defaultValue="" onChanged={(newDescription) => nodeData.description = newDescription} labelName="Description" />
		</div>

		{isCharacter && <CharacterInfoFormComponent defaultCharacterData={{}} onChanged={newData => {nodeData.characterData = {...nodeData.characterData, ...newData};}}/>}
		{isLocation && <LocationInfoFormComponent defaultLocationData={{}} onChange={newData => {nodeData.locationData = newData;}}/>}
		<EditeableList defaultElement={{ skill: "None", difficulty: "10", description: "Description" }} header="Secrets" onChange={(newData) => {nodeData.secrets = newData;}} >
			<Secret />
		</EditeableList>

		<div className="p-3 bottom-0 left-2 right-5 ">
			<button className="mr-10">Cancel</button>
			<button onClick={() => console.log(nodeData)}>Submit</button>
		</div>
	</div>

}