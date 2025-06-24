import { useRef,} from "react";
import EditeableList from "../../EditeableFields/EditeableList";
import AbilityDescription from "./AbilityDescription";
import CharacterBaseStatsFormComponent from "./CharacterBaseStatsFormComponent";
import SkillEntry from "./SkillEntry";

export default function CharacterInfoFormComponent({defaultCharacterData, onChanged}) {

	const characterData = useRef(defaultCharacterData);



	function updateCharacterData(label, value) {
		let tempData = characterData.current;
		tempData[label] = value;
		characterData.current = tempData;
		onChanged(characterData);
	}

	return <>
		<CharacterBaseStatsFormComponent defaultCharacterData={{}} onChange={newData => {updateCharacterData("statsData", newData)}}/>
		<EditeableList
			defaultElement={{skill:"Stealth", bonus:"2"}}
			header="Skills"
			onChange={newData => {updateCharacterData("skills", newData);}}
		>
			<SkillEntry />
		</EditeableList>
		<EditeableList
			defaultElement={{abilityName:"Ability", abilityDescription:"Description"}}
			header="Feats and Actions:"
			onChange={newData => {updateCharacterData("actions", newData);}}
		>
			<AbilityDescription />
		</EditeableList>
	</>
}