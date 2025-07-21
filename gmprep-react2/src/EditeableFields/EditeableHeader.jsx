import { useEffect, useState } from "react";

export default function EditeableHeader({defaultValue, onChanged}) {
	const [isBeingEdited, setIsBeingEdited] = useState(false);
	const [textContent, setTextContent] = useState(defaultValue);

	useEffect(() => {
		onChanged(textContent);
	},
	[textContent, onChanged])

	if (isBeingEdited) {
		return (
			<div className="flex columns w-full">
			<input
				type="text"
				autoFocus
				className="h3TextInput bg-gray-700 w-full text-center"
				defaultValue={textContent ?? "Name"}
				onChange={(e) => setTextContent(e.target.value)}
				onKeyUp={(e) => {
					if (e.key === 'Enter') {
						setIsBeingEdited(false)
					}
				}}
			/>
			<img src="./icons/ui/check_icon.png" className="self-end" onClick={() => {
				setIsBeingEdited(false);
			}}/>
			</div>
		);
	} else {
		return (
			<div className="flex columns w-full">
			<h3 className="flex-grow">{textContent}</h3>
			<img src="./icons/ui/wrench_icon.png" className="self-end" onClick={() => setIsBeingEdited(true)} />
			</div>
		);
	}


}