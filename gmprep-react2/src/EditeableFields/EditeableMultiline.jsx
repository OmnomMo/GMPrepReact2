import { useState } from "react";

export default function EditeableMultiline({ defaultValue, labelName, onChanged }) {
	const [isBeingEdited, setIsBeingEdited] = useState(false);
	const [textContent, setTextContent] = useState(defaultValue);
	const [previousTextContent, setPreviousTextContent] = useState(textContent);


	if (isBeingEdited) {
		return (
			<div className="flex flex-col w-full">
				<div className="flex flex-row">
					<h4 className="flex-grow text-left">{labelName}</h4>
					<img src="/icons/ui/check_icon.png"
						onClick={() => {
							setIsBeingEdited(false);
							onChanged(textContent);
						}}
						className="self-center"/>
				</div>
			<textarea
				autoFocus
				rows="6"
				className="bg-gray-700 w-full mt-2 p-2"
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
					<h4 className="flex-grow text-left">{labelName}</h4>
					<img src="/icons/ui/wrench_icon.png"  className="self-center" onClick={() => setIsBeingEdited(true)} />
				</div>
				<div className="flex-grow text-left whitespace-pre-wrap bg-gray-800 mt-2 p-2">{textContent}</div>
			</div>
		);
	}



}