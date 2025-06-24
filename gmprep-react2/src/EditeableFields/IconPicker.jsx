import { useEffect, useRef, useState } from "react";
import DialogBase from "../Dialogues/DialogueBase";
import IconSelectorPopup from "../Dialogues/IconSelectorPopup";

export default function IconPicker({defaultIcon, onChanged}) {
	const [currentIcon, setCurrentIcon] = useState(defaultIcon);
	const [dialogResult, setDialogResult] = new useState(null);
	const [iconSize, setIconSize] = new useState("64")

	useEffect(() => {
		onChanged({icon:currentIcon, iconSize:iconSize})
	}, [onChanged, currentIcon, iconSize])

	const dialogRef = useRef(null);

	return (
		<div id="iconPicker" className="w-full flex flex-row justify-center">
			<img src={"/icons/default/" + currentIcon} className="" width="64" height="64" onClick={() => {
				dialogRef.current.showModal();
			}}
			/>
			<DialogBase 
				onCancel={() => {
					dialogRef.current.close();
				}}
				onSubmit={() => {
					if (!dialogResult.icon) {
						return;
					}
					setCurrentIcon(dialogResult.icon ?? currentIcon);
					setIconSize(dialogResult.iconSize);
					dialogRef.current.close();
				}}
				ref={dialogRef}>
				<IconSelectorPopup dialogResult={dialogResult} setDialogResult={setDialogResult} defaultIcon={currentIcon} defaultIconSize={iconSize}/>
			</DialogBase>
		</div>
	)
}