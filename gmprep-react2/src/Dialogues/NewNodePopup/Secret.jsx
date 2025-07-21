import { useRef, useState } from "react"
import {SKILLS} from "../../Globals/Skills";

export default function Secret({defaultContent, onDelete, onChange}) {

	const [editing, setEditing] = useState(false);

	//Keys: testSkill, description, testDifficulty
	const [secretData, setSecretData] = useState(defaultContent)

	const testSkill = useRef(secretData.testSkill);
	const description = useRef(secretData.description);
	const testDifficulty = useRef(secretData.testDifficulty);


	function stopEditing() {
		setEditing(false);

		let newData = {
			id: defaultContent.id,
			testSkill: testSkill.current,
			description: description.current,
			testDifficulty: testDifficulty.current,
		}

		setSecretData(newData)
		onChange(
			defaultContent.id,
			newData
		)
	}


	if (!editing) {
		//Default Secret display
		return (
			<div className="statBlock flexRow">

				<div className="w-full flexCol">
					{(secretData && secretData.testSkill != "None") && 
						<p className="text-left w-full font-bold">{secretData.testSkill + " (" + secretData.testDifficulty + "):"}</p>
					}
					<p className="text-left whitespace-pre-wrap">{secretData.description}</p>
				</div>
				<img src="./icons/ui/delete_icon.png" className="self-start" onClick={() => onDelete(secretData.id)} />
				<img src="./icons/ui/wrench_icon.png" className="self-start" onClick={() => setEditing(true)} />
			</div>
		)
	} else {
		//Editing secret
		return (
			<div className="statBlock flexCol">
				<div className="flexRow">
					<select defaultValue={testSkill.current} onChange={e => {
						testSkill.current = e.target.value;
					}}>
						{SKILLS.map(skill => <option key={skill} value={skill}>{skill}</option>)}
					</select>
					<input
						type="text"
						inputMode="numeric"
						maxLength="2"
						className="w-10 ml-2 pl-2"
						defaultValue={testDifficulty.current}
						onKeyUp={(e) => {
							if (e.key === 'Enter') {
								stopEditing();
							}
						}}
						onChange={e => testDifficulty.current = (e.target.value)} />
					<div className="w-full"></div>
					<img src="./icons/ui/check_icon.png" onClick={() => {
						stopEditing();
					}} />
				</div>
				<textarea
					autoFocus
					rows="4"
					className="w-full"
					defaultValue={description.current ?? ""}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.getModifierState("Shift")) {
							stopEditing();
						}
					}}
					onChange={e => {
						description.current = e.target.value;
					}
					}
				/>
			</div>

		)
	}
}