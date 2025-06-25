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
		onChanged(characterData.current);
	}

	return <>
		<CharacterBaseStatsFormComponent defaultCharacterData={{}} onChange={newData => {
			characterData.current = {...characterData.current, ...newData};
			onChanged(characterData.current)
		}}/>
		<EditeableList
			defaultElement={{skill:"Stealth", bonus:"2"}}
			header="Skills"
			onChange={newData => {updateCharacterData("Skills", newData);}}
		>
			<SkillEntry />
		</EditeableList>
		<EditeableList
			defaultElement={{abilityName:"Ability", abilityDescription:"Description"}}
			header="Feats and Actions:"
			onChange={newData => {updateCharacterData("Actions", newData);}}
		>
			<AbilityDescription />
		</EditeableList>
	</>
}