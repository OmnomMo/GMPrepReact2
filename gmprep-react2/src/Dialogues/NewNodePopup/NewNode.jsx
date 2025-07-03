import { useContext, useEffect, useRef, useState } from "react";
import CreatureinfoFormComponent from "./CreatureInfoFormComponent";
import LocationInfoFormComponent from "./LocationInfoFormComponent";
import EditeableMultiline from "../../EditeableFields/EditeableMultiline";
import IconPicker from "../../EditeableFields/IconPicker";
import EditeableHeader from "../../EditeableFields/EditeableHeader";
import TypeAlignmentComponent from "./TypeAlignmentComponent";
import EditeableList from "../../EditeableFields/EditeableList";
import Secret from "./Secret";
import { GlobalContext } from "../../Contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { defaultNode } from "../../Globals/DefaultNode";

async function postNode(data) {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data.data)
	};
	return fetch('http://localhost:5140/Nodes/Update', requestOptions)
		.then(response => response.json());
}

async function deleteNode(data) {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data.data)
	}
	return fetch('http://localhost:5140/Nodes/Delete', requestOptions);
}

export default function NewNode() {

	const remountCount = useRef(0);
	const [localNodeData, setLocalNodeData] = useState({});
	const {currentNodeData, setCurrentNodeData} = useContext(GlobalContext);
	const [isCreature, setIsCreature] = useState(currentNodeData?.creatureInfo != null);
	const [isLocation, setIsLocation] = useState(currentNodeData?.locationInfo != null);
	const queryClient = useQueryClient();

	//remount when current node data changes
	useEffect(() => {
		//reset all local data overrides and reload data
		setLocalNodeData({});
		//Remount Form
		remountCount.current += 1;
	}, [currentNodeData]);

	const updateNodeMutation = useMutation({
		mutationFn: postNode,
		onSuccess: (data) => {
			queryClient.invalidateQueries({queryKey: ['AllNodes']});
			queryClient.invalidateQueries({queryKey: ['MapNodes']});
			setCurrentNodeData({...data});
		}
	})

	const deleteNodeMutation = useMutation({
		mutationFn: deleteNode,
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['AllNodes']});
		}
	})

	return <div className="w-full " key={"NewNode" + remountCount.current}>
		<div className="flexRow  mb-4">
			<label className="toggleButton m-2">
				<input
					type="checkbox"
					name="isCreature"
					checked={isCreature}
					onChange={e => {
						setIsCreature(e.target.checked);
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
					localNodeData.mapIconPath = dialogResult.icon;
					localNodeData.mapIconSize = dialogResult.iconSize; }}
				defaultIcon={currentNodeData?.mapIconPath ?? "well.png"}
				defaultIconSize={currentNodeData?.mapIconSize ?? "64"}
			/>
		</div>
		<div>
			<EditeableHeader defaultValue={currentNodeData?.name ?? "Name"} onChanged={(newText) => localNodeData.name = newText} />
		</div>
		{isCreature && <div>
			<TypeAlignmentComponent
				defaultSize={currentNodeData?.creatureInfo?.size ?? "Medium"}
				defaultType={currentNodeData?.creatureInfo?.creatureType ?? "Humanoid"}
				defaultAlignment={currentNodeData?.creatureInfo?.alignment ?? "Neutral Good"}
				onChange={values => {
					if (!("creatureInfo" in localNodeData)) {
						localNodeData.creatureInfo = {};
					}
					localNodeData.creatureInfo.creatureType = values.type;
					localNodeData.creatureInfo.size = values.size;
					localNodeData.creatureInfo.alignment = values.alignment;
				}}/>
		</div>}
		<div>
			<EditeableMultiline defaultValue={currentNodeData?.description ?? ""} onChanged={(newDescription) => localNodeData.description = newDescription} labelName="Description" />
		</div>

		{isCreature && <CreatureinfoFormComponent defaultCreatureInfoData={currentNodeData?.creatureInfo ?? {}} onChanged={newData => {localNodeData.creatureInfo = {...localNodeData.creatureInfo, ...newData};}}/>}
		{isLocation && <LocationInfoFormComponent defaultLocationData={currentNodeData?.locationInfo ?? {}} onChange={newData => {localNodeData.locationInfo = newData;}}/>}
		<EditeableList defaultData={currentNodeData?.secrets ?? []} defaultElement={{ testSkill: "None", testDifficulty: "10", description: "Description" }} header="Secrets" onChange={(newData) => {localNodeData.secrets = newData;}} >
			<Secret />
		</EditeableList>

		<div className="p-3 bottom-0 left-2 right-5 ">
			<button className="mr-10" onClick={() => {
				localNodeData.id = currentNodeData.id;
				if (confirm("Are you sure you want to delete this?")) {
					setCurrentNodeData({...defaultNode})
					deleteNodeMutation.mutate({
						data: localNodeData,
					})
				} 
			}}>
				Delete
			</button>
			<button className="mr-10" onClick={
				() => {setCurrentNodeData({...defaultNode})}
			}>Cancel</button>
			<button onClick={() => {
				localNodeData.id = currentNodeData.id;
				updateNodeMutation.mutate({
					data: localNodeData,
				})
			}}>Submit</button>
		</div>
	</div>

}