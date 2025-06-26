import { useContext, useState } from "react";
import CharacterInfoFormComponent from "./CharacterInfoFormComponent";
import LocationInfoFormComponent from "./LocationInfoFormComponent";
import EditeableText from "../../EditeableFields/EditeableText";
import EditeableMultiline from "../../EditeableFields/EditeableMultiline";
import IconPicker from "../../EditeableFields/IconPicker";
import EditeableHeader from "../../EditeableFields/EditeableHeader";
import TypeAlignmentComponent from "./TypeAlignmentComponent";
import EditeableList from "../../EditeableFields/EditeableList";
import Secret from "./Secret";
import { NodeContext } from "../../Contexts";



export default function NewNode() {

	const [nodeData] = useState({});
	const {currentNodeData, setCurrentNodeData} = useContext(NodeContext);
	const [isCharacter, setIsCharacter] = useState(currentNodeData?.creatureInfo != null);
	const [isLocation, setIsLocation] = useState(currentNodeData?.locationInfo != null);


	function postNode(data) {
		const requestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(data)
		};
		fetch('http://localhost:5140/Nodes/Update', requestOptions)
			.then(response => response.json)
			.then(data => console.log(data));
	}

	return <div className="w-full ">
		<div className="flexRow  mb-4">
			<label className="toggleButton m-2">
				<input
					type="checkbox"
					name="isCharacter"
					checked={isCharacter}
					onChange={e => {
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
						setIsLocation(e.target.checked);
					}}
				/>
				<span className="toggleBG"><img src="/icons/ui/location_icon.png" className="p-1" /></span>
			</label>
		</div>
		<div>
			<IconPicker
				onChanged={(dialogResult) => {
					nodeData.MapIconPath = dialogResult.icon;
					nodeData.MapIconSize = dialogResult.iconSize; }}
				defaultIcon={currentNodeData?.mapIconPath ?? "well.png"}
			/>
		</div>
		<div>
			<EditeableHeader defaultValue={currentNodeData?.name ?? "Name"} onChanged={(newText) => nodeData.Name = newText} />
		</div>
		{isCharacter && <div>
			<TypeAlignmentComponent
				defaultSize={currentNodeData?.creatureInfo?.size ?? "Medium"}
				defaultType={currentNodeData?.creatureInfo?.creatureType ?? "Humanoid"}
				defaultAlignment={currentNodeData?.creatureInfo?.alignment ?? "Neutral Good"}
				onChange={values => {
					if (!("characterData" in nodeData)) {
						nodeData.CreatureInfo = {};
					}
					nodeData.CreatureInfo.CreatureType = values.type;
					nodeData.CreatureInfo.Size = values.size;
					nodeData.CreatureInfo.Alignment = values.alignment;
				}}/>
		</div>}
		<div>
			<EditeableMultiline defaultValue={currentNodeData?.description ?? ""} onChanged={(newDescription) => nodeData.Description = newDescription} labelName="Description" />
		</div>

		{isCharacter && <CharacterInfoFormComponent defaultCharacterData={currentNodeData?.creatureInfo ?? {}} onChanged={newData => {nodeData.CreatureInfo = {...nodeData.CreatureInfo, ...newData};}}/>}
		{isLocation && <LocationInfoFormComponent defaultLocationData={currentNodeData?.locationInfo ?? {}} onChange={newData => {nodeData.LocationInfo = newData;}}/>}
		<EditeableList defaultData={currentNodeData?.secrets ?? []} defaultElement={{ skill: "None", difficulty: "10", description: "Description" }} header="Secrets" onChange={(newData) => {nodeData.Secrets = newData;}} >
			<Secret />
		</EditeableList>

		<div className="p-3 bottom-0 left-2 right-5 ">
			<button className="mr-10">Cancel</button>
			<button onClick={() => {
				console.log(JSON.stringify(nodeData));
				postNode(nodeData);
			}}>Submit</button>
		</div>
	</div>

}