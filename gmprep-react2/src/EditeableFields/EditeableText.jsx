import { useState } from "react";

export default function EditeableText({defaultValue, onChanged}) {
	const [isBeingEdited, setIsBeingEdited] = useState(false);
	const [textContent, setTextContent] = useState(defaultValue);



	if (isBeingEdited) {
		return (
			<div className="flex columns w-full">
			<input
				type="text"
				autoFocus
				className="bg-gray-700 flex-grow text-center"
				defaultValue={textContent ?? "Name"}
				onChange={(e) => setTextContent(e.target.value)}
				onKeyUp={(e) => {
					if (e.key === 'Enter') {
						setIsBeingEdited(false)
						onChanged(textContent);
					}
				}}
			/>
			<img src="/icons/ui/check_icon.png" onClick={() => {
				setIsBeingEdited(false);
				onChanged(textContent);
			}}/>
			</div>
		);
	} else {
		return (
			<div className="flex columns w-full">
			<p className="flex-grow">{textContent}</p>
			<img src="/icons/ui/wrench_icon.png" onClick={() => setIsBeingEdited(true)} />
			</div>
		);
	}


}