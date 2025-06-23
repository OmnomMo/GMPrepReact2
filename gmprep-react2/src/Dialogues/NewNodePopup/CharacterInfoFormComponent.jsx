import EditeableList from "../../EditeableFields/EditeableList";
import CharacterBaseStatsFormComponent from "./CharacterBaseStatsFormComponent";
import SkillEntry from "./SkillEntry";

export default function CharacterInfoFormComponent() {
	return <>
		<CharacterBaseStatsFormComponent />
		<EditeableList defaultElement={{skill:"Stealth", bonus:"2"}} header="Skills">
			<SkillEntry />
		</EditeableList>
	</>
}