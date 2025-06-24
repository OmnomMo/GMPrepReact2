import { useEffect, useState } from "react";
import StringSelect from "../../EditeableFields/StringSelect";
import { SKILLS } from "../../Globals/Skills";

export default function SkillEntry({ defaultContent, onDelete, onUpdate, onChange}) {

	const [editing, setEditing] = useState(false);
	const [selectedSkill, setSelectedSkill] = useState(defaultContent.skill);
	const [bonus, setBonus] = useState(defaultContent.bonus);

	useEffect(() => {
		onChange({skill:selectedSkill, bonus:bonus});
	}, [selectedSkill, bonus, onChange])

	function doneEditing() {
		setEditing(false);
		onUpdate({selectedSkill, bonus});
	}

	if (editing) {
		return (
			<div style={{ display: "flex", flexDirection: "row" }}>
				<StringSelect defaultValue={selectedSkill} options={SKILLS} onUpdate={selected => setSelectedSkill(selected)} />
				<p className="ml-4">+</p>
				<input
					type="text"
					inputMode="numeric"
					autoFocus
					maxLength="2"
					className="w-6 pl-1 text-left"
					defaultValue={bonus}
					onChange={e =>
					setBonus(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							doneEditing();
						}
					}}
					/>
				<div className="w-full" />
				<img src="/icons/ui/check_icon.png" className="self-center" onClick={() => doneEditing()}/>
			</div>
		)
	} else {
		return (
		<div style={{ display: "flex", flexDirection: "row" }} >
			<p className="w-60 text-left">{selectedSkill}:</p>
			<p className="w-full text-left">+{bonus}</p>
			<img src="/icons/ui/delete_icon.png" className="self-center" onClick={() => onDelete(defaultContent.id)} />
			<img src="/icons/ui/wrench_icon.png" className="self-center" onClick={() => setEditing(true)}/>
		</div>
		)
	}
}