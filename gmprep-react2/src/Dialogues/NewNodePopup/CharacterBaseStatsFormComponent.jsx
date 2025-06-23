import { useState } from "react";
import CharacterBaseStat from "./CharacterBaseStat";
import EditeableNumericicon from "../../EditeableFields/EditeableNumericIcon";
import { ABILITIES} from "../../Globals/Skills";

export default function CharacterBaseStatsFormComponent() {
	const [editingStats, setEditingStats] = useState(false);
	const [editingSpeed, setEditingSpeed] = useState(false);
	
	function doneEditingStats() {
		setEditingStats(false);
	}

	function onUpdateSpeed() {
		setEditingSpeed(false);
	}

	return (
		<>
		<div style={{display:"flex", flexDirection:"row"}}>
			<h4 className="text-left w-full">Stats</h4>
			{(!editingStats) && <img src="/icons/ui/wrench_icon.png" className="self-end pb-1" onClick={() => setEditingStats(true)} />}
			{(editingStats) && <img src="/icons/ui/check_icon.png" className="self-end pb-1" onClick={() => setEditingStats(false)} />}
		</div>

		<div id="statblock" className="grid grid-cols-2 gap-2 bg-gray-100/5 p-2 mt-2">
			<CharacterBaseStat label="HP:" defaultValue={20} editeable={editingStats} doneEditing={doneEditingStats}/>
			<CharacterBaseStat label="AC:" defaultValue={10} editeable={editingStats} doneEditing={doneEditingStats}/>
			{ABILITIES.map(ability =>
				<CharacterBaseStat
					label={ability + ":"}
					defaultValue={10}
					editeable={editingStats}
					doneEditing={doneEditingStats}
					showModifier={true}
				/>)
			}
		</div>
		<div id="speedblock" style={{display:"flex", flexDirection:"row"}} className="bg-gray-100/5 p-2 mt-2 w-full">
			<EditeableNumericicon defaultValue={30} iconSource={"/icons/ui/walk_icon.png"} showEditIcon={false} editeableOverride={editingSpeed} onUpdate={onUpdateSpeed}/>
			<EditeableNumericicon defaultValue={0} iconSource={"/icons/ui/swim_icon.png"} showEditIcon={false} editeableOverride={editingSpeed}  onUpdate={onUpdateSpeed}/>
			<EditeableNumericicon defaultValue={0} iconSource={"/icons/ui/fly_icon.png"} showEditIcon={false} editeableOverride={editingSpeed} onUpdate={onUpdateSpeed}/>
			{(!editingSpeed) && <img src="/icons/ui/wrench_icon.png" onClick={ () => setEditingSpeed(true)} />}
			{editingSpeed && <img src="/icons/ui/check_icon.png" onClick={() => setEditingSpeed(false)} />}
		</div>
		</>
	)
}