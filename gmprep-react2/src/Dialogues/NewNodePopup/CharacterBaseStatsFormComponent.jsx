import { useRef, useState } from "react";
import CharacterBaseStat from "./CharacterBaseStat";
import EditeableNumericicon from "../../EditeableFields/EditeableNumericIcon";
import { ABILITIES} from "../../Globals/Skills";
import ImmunitiesResistances from "./ImmunitiesResistances";
import EditeableMultiline from "../../EditeableFields/EditeableMultiline"
import EditeableText from "../../EditeableFields/EditeableText"

export default function CharacterBaseStatsFormComponent({defaultStatsData, onChange}) {
	const statsData = useRef(defaultStatsData);
	const [editingStats, setEditingStats] = useState(false);
	const [editingSpeed, setEditingSpeed] = useState(false);

	function updateStatsData(label, value) {
		let tempData = {...statsData.current};
		tempData[label] = value;
		statsData.current = tempData;
		onChange(statsData.current);
	}
	
	function doneEditingStats() {
		setEditingStats(false);
	}

	function onUpdateSpeed() {
		setEditingSpeed(false);
	}

	return (
		<>
		<div className="flexRow">
			<h4 className="text-left w-full">Stats</h4>
			{(!editingStats) && <img src="/icons/ui/wrench_icon.png" className="self-end pb-1" onClick={() => setEditingStats(true)} />}
			{(editingStats) && <img src="/icons/ui/check_icon.png" className="self-end pb-1" onClick={() => setEditingStats(false)} />}
		</div>

		<div id="statblock" className="grid grid-cols-2 gap-2 statBlock">
			<CharacterBaseStat label="HP" defaultValue={20} editeable={editingStats} doneEditing={doneEditingStats} onChange={updateStatsData}/>
			<CharacterBaseStat label="AC" defaultValue={10} editeable={editingStats} doneEditing={doneEditingStats} onChange={updateStatsData}/>
			{ABILITIES.map(ability =>
				<CharacterBaseStat
					label={ability}
					key={ability}
					defaultValue={10}
					editeable={editingStats}
					doneEditing={doneEditingStats}
					onChange={updateStatsData}
					showModifier={true}
				/>)
			}
		</div>
		<div id="Immunities" className="w-full flex-row">
			<ImmunitiesResistances
				editing={editingStats}
				defaultData={{
					damageResistances:[],
					damageImmunities:[],
					conditionImmunities:[]
				}}
				onChange={(newData) => {updateStatsData("resistances", newData)}}
			/>
		</div>
		<div className="statBlock">
		<EditeableText defaultValue={1} labelName="CR" onChanged={(newValue) => {updateStatsData("CR", newValue)}}/>
		</div>
		<div id="speedblock" className="statBlock flexRow">
			<EditeableNumericicon
				defaultValue={30}
				iconSource={"/icons/ui/walk_icon.png"}
				showEditIcon={false}
				editeableOverride={editingSpeed}
				onUpdate={onUpdateSpeed}
				onChange={(newValue) => {updateStatsData("walkingSpeed", newValue)}}
			/>
			<EditeableNumericicon
				defaultValue={0}
				iconSource={"/icons/ui/swim_icon.png"}
				showEditIcon={false}
				editeableOverride={editingSpeed}
				onChange={(newValue) => {updateStatsData("swimmingSpeed", newValue)}}
				onUpdate={onUpdateSpeed}
			/>
			<EditeableNumericicon
				defaultValue={0}
				iconSource={"/icons/ui/fly_icon.png"}
				showEditIcon={false}
				editeableOverride={editingSpeed}
				onChange={(newValue) => {updateStatsData("flyingSpeed", newValue)}}
				onUpdate={onUpdateSpeed}
			/>
			{(!editingSpeed) && <img src="/icons/ui/wrench_icon.png" onClick={ () => setEditingSpeed(true)} />}
			{editingSpeed && <img src="/icons/ui/check_icon.png" onClick={() => setEditingSpeed(false)} />}
		</div>
		<EditeableMultiline defaultValue="Common" labelName="Languages" rows={2} onChanged={(newValue) => {updateStatsData("languages", newValue)}}/>
		<EditeableMultiline defaultValue="passive Perception 10" labelName="Senses" rows={2} onChanged={newValue => {updateStatsData("senses", newValue)}}/>
		</>
	)
}