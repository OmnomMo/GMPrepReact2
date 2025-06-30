import { useRef,} from "react";
import EditeableList from "../../EditeableFields/EditeableList";
import ActionDescription from "./ActionDescription";
import CreatureBaseStatsFormComponent from "./CreatureBaseStatsFormComponent";
import SkillEntry from "./SkillEntry";

export default function CreatureInfoFormComponent({defaultCreatureInfoData, onChanged}) {

	const creatureData = useRef(defaultCreatureInfoData);



	function updateCreatureData(label, value) {
		let tempData = creatureData.current;
		tempData[label] = value;
		creatureData.current = tempData;
		onChanged(creatureData.current);
	}

	return <>
		<CreatureBaseStatsFormComponent defaultStatsData={defaultCreatureInfoData} onChange={newData => {
			creatureData.current = {...creatureData.current, ...newData};
			onChanged(creatureData.current)
		}}/>
		<EditeableList
			defaultData ={defaultCreatureInfoData?.skills ?? []}
			defaultElement={{skillName:"Stealth", bonus:"2"}}
			header="Skills"
			onChange={newData => {updateCreatureData("Skills", newData);}}
		>
			<SkillEntry />
		</EditeableList>
		<EditeableList
			defaultData ={defaultCreatureInfoData?.actions ?? []}
			defaultElement={{name:"Ability", description:"Description"}}
			header="Feats and Actions:"
			onChange={newData => {updateCreatureData("Actions", newData);}}
		>
			<ActionDescription />
		</EditeableList>
	</>
}