import { useEffect, useState } from "react";

export default function AbilityDescription({ defaultContent, onUpdate, onDelete, onChange}) {

	const [editing, setEditing] = useState(false);
	const [abilityName, setAbilityName] = useState(defaultContent.name);
	const [abilityDescription, setAbilityDescription] = useState(defaultContent.description);

	useEffect(() => {
		onChange({Name:abilityName, Description:abilityDescription});
	}, [abilityName, abilityDescription, onChange])

	function doneEditing() {
		setEditing(false);
		onUpdate(defaultContent.id, { abilityName, abilityDescription });
	}

	if (editing) {
		return (
			<div style={{ display: "flex", flexDirection: "row" }} className="w-full mt-2 p-2 bg-gray-100/5">
				<div style={{ display: "flex", flexDirection: "column" }} className="w-full">
					<input
						type="text"
						className="w-25"
						autoFocus
						value={abilityName}
						onChange={e => setAbilityName(e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								doneEditing();
							}
						}}
						/>
					<textarea
						rows={4}
						onChange={e => setAbilityDescription(e.target.value)}
						value={abilityDescription}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								doneEditing();
							}
						}}
						/>
				</div>
				<img src="/icons/ui/check_icon.png" className="self-start" onClick={() => doneEditing()} />
			</div>
		)
	} else {
		return (
			<div style={{ display: "flex", flexDirection: "row" }} className="w-full mt-2 p-2 bg-gray-100/5">
				<p className="w-full text-left"><b>{abilityName}:</b> {abilityDescription}</p>
				<img src="/icons/ui/delete_icon.png" className="self-start" onClick={() => onDelete(defaultContent.id)} />
				<img src="/icons/ui/wrench_icon.png" className="self-start" onClick={() => setEditing(true)} />
			</div>
		)
	}


}