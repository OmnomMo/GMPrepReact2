import { useState } from "react"
import {SKILLS} from "../../Globals/Skills";

export default function Secret({defaultContent, onDelete, onUpdate}) {

	const [editing, setEditing] = useState(false);
	const [selectedSkill, setSelectedSkill] = useState(defaultContent.skill);
	const [descriptionText, setDescriptionText] = useState(defaultContent.description);
	const [previousDescriptionText, setPreviousDescriptionText] = useState(descriptionText);
	const [selectedDifficulty, setSelectedDifficulty] = useState(defaultContent.difficulty);

	function stopEditing() {
		setEditing(false);
		onUpdate(defaultContent.id, { id: defaultContent.id, skill: selectedSkill, description: descriptionText, difficulty: selectedDifficulty });
	}

	if (!editing) {
		//Default Secret display
		return (
			<div style={{ display: "flex", flexDirection: "row" }} className="w-full  mt-2 p-2 bg-gray-100/5">

				<div className="w-full" style={{ display: "flex", flexDirection: "column" }}>
					{(defaultContent && defaultContent.skill != "None") && 
						<p className="text-left w-full font-bold">{defaultContent.skill + " (" + defaultContent.difficulty + "):"}</p>
					}
					<p className="text-left whitespace-pre-wrap">{defaultContent.description}</p>
				</div>
				<img src="/icons/ui/delete_icon.png" className="self-start" onClick={() => onDelete(defaultContent.id)} />
				<img src="/icons/ui/wrench_icon.png" className="self-start" onClick={() => setEditing(true)} />
			</div>
		)
	} else {
		//Editing secret
		return (
			<div style={{ display: "flex", flexDirection: "column" }} className="w-full  mt-2 p-2 bg-gray-100/5">
				<div style={{ display: "flex", flexDirection: "row" }}>
					<select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)}>
						{SKILLS.map(skill => <option key={skill} value={skill}>{skill}</option>)}
					</select>
					<input
						type="text"
						inputMode="numeric"
						maxLength="2"
						className="w-10 ml-2 pl-2"
						defaultValue={selectedDifficulty}
						onKeyUp={(e) => {
							if (e.key === 'Enter') {
								stopEditing();
							}
						}}
						onChange={e => setSelectedDifficulty(e.target.value)} />
					<div className="w-full"></div>
					<img src="/icons/ui/check_icon.png" onClick={() => {
						stopEditing();
					}} />
				</div>
				<textarea
					autoFocus
					rows="4"
					className="bg-gray-700 w-full mt-2 p-2"
					defaultValue={defaultContent.description ?? ""}
					onKeyDown={(e) => {
						//when pressing enter we stop editing but also the enter input should not be written into the text
						if (e.key === 'Enter' && !e.getModifierState("Shift")) {
							setDescriptionText(previousDescriptionText);
							stopEditing();
						}
					}}
					onChange={e => {
						setDescriptionText(previousValue => {
							//Store previous value in separate state
							setPreviousDescriptionText(previousValue);
							return e.target.value;
						})
					}
					}
				/>
			</div>

		)
	}
}