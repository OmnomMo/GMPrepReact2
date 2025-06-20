import { useState } from "react";

export default function EditeableMultiline({ defaultValue, labelName, onChanged }) {
	const [isBeingEdited, setIsBeingEdited] = useState(false);
	const [textContent, setTextContent] = useState(defaultValue);
	const [previousTextContent, setPreviousTextContent] = useState(textContent);


	if (isBeingEdited) {
		return (
			<div className="flex flex-col w-full">
				<div className="flex flex-row">
					<p className="flex-grow text-left">{labelName}</p>
					<img src="/icons/ui/check_icon.png" onClick={() => {
						setIsBeingEdited(false);
						onChanged(textContent);
					}} />
				</div>
				<textarea
					autoFocus
					rows="6"
					className="bg-gray-700 w-full"
					defaultValue={textContent ?? "Name"}
					onChange={(e) => setTextContent((previousValue) => {
						setPreviousTextContent(previousValue);
						return e.target.value;})}
					onKeyUp={(e) => {
						if (e.key === 'Enter' ) {
							if (e.getModifierState("Shift")) {
								console.log("enter with shift")
							} else {
								//hack: For now we revert the textfield to the previous value when confirming with enter
								//so that the enter is not accepted in the field
								setTextContent(previousTextContent)
								setIsBeingEdited(false)
								onChanged(textContent);
							}
						}
					}}
				/>

			</div>
		);
	} else {
		return (
			<div className="flex flex-col w-full">
				<div className="flex flex-row w-full">
					<p className="flex-grow text-left">{labelName}</p>
					<img src="/icons/ui/wrench_icon.png" onClick={() => setIsBeingEdited(true)} />
				</div>
				<div className="flex-grow text-left whitespace-pre-wrap bg-gray-800">{textContent}</div>
			</div>
		);
	}



}