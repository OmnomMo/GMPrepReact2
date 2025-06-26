import { useEffect, useState } from "react"
import {SKILLS} from "../../Globals/Skills";

export default function Secret({defaultContent, onDelete, onUpdate, onChange}) {

	const [editing, setEditing] = useState(false);
	const [selectedSkill, setSelectedSkill] = useState(defaultContent.testSkill);
	const [descriptionText, setDescriptionText] = useState(defaultContent.description);
	const [previousDescriptionText, setPreviousDescriptionText] = useState(descriptionText);
	const [selectedDifficulty, setSelectedDifficulty] = useState(defaultContent.testDifficulty);

	useEffect(() => {
		onChange({TestSkill:selectedSkill, Description:descriptionText, TestDifficulty:selectedDifficulty});
	}, [selectedSkill, selectedDifficulty, descriptionText, onChange])

	function stopEditing() {
		setEditing(false);
		onUpdate(defaultContent.id, { id: defaultContent.id, skill: selectedSkill, description: descriptionText, difficulty: selectedDifficulty });
	}

	if (!editing) {
		//Default Secret display
		return (
			<div className="statBlock flexRow">

				<div className="w-full flexCol">
					{(defaultContent && defaultContent.testSkill != "None") && 
						<p className="text-left w-full font-bold">{defaultContent.testSkill + " (" + defaultContent.testDifficulty + "):"}</p>
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
			<div className="statBlock flexCol">
				<div className="flexRow">
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
					className="w-full"
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