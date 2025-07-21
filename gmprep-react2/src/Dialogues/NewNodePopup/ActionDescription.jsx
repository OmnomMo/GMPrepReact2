import { useRef, useState } from "react";

export default function ActionDescription({ defaultContent, onDelete, onChange}) {

	const [editing, setEditing] = useState(false);

	//keys: id, name, description
	const [actionData, setActionData] = useState(defaultContent)

	const name = useRef(actionData.name);
	const description = useRef(actionData.description);



	function doneEditing() {
		let newData = {
			id: defaultContent.id,
			name: name.current,
			description: description.current,
		};

		setEditing(false);

		setActionData(newData);
		onChange(defaultContent.id, newData);
	}

	if (editing) {
		return (
			<div
				style={{ display: "flex", flexDirection: "row" }}
				name={"aciton:" + defaultContent.id}
				key={"action:" + defaultContent.id}
				className="w-full mt-2 p-2 bg-gray-100/5">
				<div style={{ display: "flex", flexDirection: "column" }} className="w-full">
					<input
						type="text"
						className="w-25"
						autoFocus
						defaultValue={name.current}
						onChange={e => {
							name.current = e.target.value;
						}}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								doneEditing();
							}
						}}
						/>
					<textarea
						rows={4}
						onChange={e => {
							description.current = e.target.value;
						}}
						defaultValue = {description.current}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								doneEditing();
							}
						}}
						/>
				</div>
				<img src="./icons/ui/check_icon.png" className="self-start" onClick={() => doneEditing()} />
			</div>
		)
	} else {
		return (
			<div style={{ display: "flex", flexDirection: "row" }} className="w-full mt-2 p-2 bg-gray-100/5">
				<p className="w-full text-left"><b>{name.current}:</b> {description.current}</p>
				<img src="./icons/ui/delete_icon.png" className="self-start" onClick={() => onDelete(defaultContent.id)} />
				<img src="./icons/ui/wrench_icon.png" className="self-start" onClick={() => setEditing(true)} />
			</div>
		)
	}


}