import { useEffect, useState } from "react";

export default function EditeableText({defaultValue, onChanged, labelName = ""}) {
	const [isBeingEdited, setIsBeingEdited] = useState(false);
	const [textContent, setTextContent] = useState(defaultValue);

	useEffect(() => {
		onChanged(textContent);
	}, [textContent, onChanged])


	if (isBeingEdited) {
		return (
			<div className="flex columns w-full">
			{labelName != "" && <p className="mr-2">{labelName}: </p>}
			<input
				type="text"
				autoFocus
				className="flex-grow text-left pl-2"
				defaultValue={textContent ?? "Name"}
				onChange={(e) => setTextContent(e.target.value)}
				onKeyUp={(e) => {
					if (e.key === 'Enter') {
						setIsBeingEdited(false)
					}
				}}
			/>
			<img src="/icons/ui/check_icon.png" onClick={() => {
				setIsBeingEdited(false);
			}}/>
			</div>
		);
	} else {
		return (
			<div className="flex columns w-full">
			{labelName != "" && <p className="mr-2">{labelName}: </p>}
			<p className="flex-grow text-left">{textContent}</p>
			<img src="/icons/ui/wrench_icon.png" className="self-end" onClick={() => setIsBeingEdited(true)} />
			</div>
		);
	}


}