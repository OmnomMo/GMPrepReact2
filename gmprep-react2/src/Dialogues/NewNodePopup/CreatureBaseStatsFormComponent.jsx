import { useRef, useState } from "react";
import CreatureBaseStat from "./CreatureBaseStat";
import EditeableNumericicon from "../../EditeableFields/EditeableNumericIcon";
import { ABILITIES} from "../../Globals/Skills";
import ImmunitiesResistances from "./ImmunitiesResistances";
import EditeableMultiline from "../../EditeableFields/EditeableMultiline"
import EditeableText from "../../EditeableFields/EditeableText"

export default function CreatureBaseStatsFormComponent({defaultStatsData, onChange}) {
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
			{(!editingStats) && <img src="./icons/ui/wrench_icon.png" className="self-end pb-1" onClick={() => setEditingStats(true)} />}
			{(editingStats) && <img src="./icons/ui/check_icon.png" className="self-end pb-1" onClick={() => setEditingStats(false)} />}
		</div>

		<div id="statblock" className="grid grid-cols-2 gap-2 statBlock">
			<CreatureBaseStat label="HP" defaultValue={defaultStatsData?.hp ?? "20"} editeable={editingStats} doneEditing={doneEditingStats} onChange={updateStatsData}/>
			<CreatureBaseStat label="AC" defaultValue={defaultStatsData?.ac ?? "10"} editeable={editingStats} doneEditing={doneEditingStats} onChange={updateStatsData}/>
			{ABILITIES.map(ability =>
				<CreatureBaseStat
					label={ability}
					key={ability}
					defaultValue={defaultStatsData[ability.toLowerCase()] ?? "10"}
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
					damageResistances:defaultStatsData.damageResistances ?? [],
					damageImmunities:defaultStatsData.damageImmunities ?? [],
					conditionImmunities:defaultStatsData.conditionImmunities ?? []
				}}
				onChange={(newData) => {
					updateStatsData("damageResistances", newData.damageResistances);
					updateStatsData("damageImmunities", newData.damageImmunities);
					updateStatsData("conditionImmunities", newData.conditionImmunities);
				}}
			/>
		</div>
		<div className="statBlock">
		<EditeableText defaultValue={defaultStatsData.cr ?? "1"} labelName="CR" onChanged={(newValue) => {updateStatsData("cr", newValue)}}/>
		</div>
		<div id="speedblock" className="statBlock flexRow">
			<EditeableNumericicon
				defaultValue={defaultStatsData.speed ?? "30"}
				iconSource={"./icons/ui/walk_icon.png"}
				showEditIcon={false}
				editeableOverride={editingSpeed}
				onUpdate={onUpdateSpeed}
				onChange={(newValue) => {updateStatsData("speed", newValue)}}
			/>
			<EditeableNumericicon
				defaultValue={defaultStatsData.speedSwimming ?? "0"}
				iconSource={"./icons/ui/swim_icon.png"}
				showEditIcon={false}
				editeableOverride={editingSpeed}
				onChange={(newValue) => {updateStatsData("speedSwimming", newValue)}}
				onUpdate={onUpdateSpeed}
			/>
			<EditeableNumericicon
				defaultValue={defaultStatsData.speedFlying ?? "0"}
				iconSource={"./icons/ui/fly_icon.png"}
				showEditIcon={false}
				editeableOverride={editingSpeed}
				onChange={(newValue) => {updateStatsData("speedFlying", newValue)}}
				onUpdate={onUpdateSpeed}
			/>
			{(!editingSpeed) && <img src="./icons/ui/wrench_icon.png" onClick={ () => setEditingSpeed(true)} />}
			{editingSpeed && <img src="./icons/ui/check_icon.png" onClick={() => setEditingSpeed(false)} />}
		</div>
		<EditeableMultiline defaultValue={defaultStatsData.languages ?? "Common"} labelName="Languages" rows={2} onChanged={(newValue) => {updateStatsData("languages", newValue)}}/>
		<EditeableMultiline defaultValue={defaultStatsData.senses ?? "Passive Perception: "} labelName="Senses" rows={2} onChanged={newValue => {updateStatsData("senses", newValue)}}/>
		</>
	)
}