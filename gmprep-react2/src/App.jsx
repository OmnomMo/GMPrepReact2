import { useRef, useState } from 'react';
import './App.css'
import DialogBase from './Dialogues/DialogueBase';
import IconSelectorPopup from './Dialogues/IconSelectorPopup';
import SidebarBase from './Dialogues/SideBarBase';
import NewNode from './Dialogues/NewNodePopup/NewNode';



function App() {

	const [dialogContent, setDialogContent] = new useState(null);
	const [dialogResult, setDialogResult] = new useState(null);
	const [currentIcon, setCurrentIcon] = new useState(null);

	const dialogRef = useRef(null);

	function toggleDialog() {

		if (!dialogRef.current) {
			return;
		}
		dialogRef.current.hasAttribute("open")
			? dialogRef.current.close()
			: dialogRef.current.showModal()
	}

	function iconSelected() {
		dialogRef.current.close();
		let selected = dialogResult;
		if (!selected) { return; }
		setCurrentIcon(selected);
	}


	return (
		<>
			<div className="App">
				<button onClick={() => {
					//pass state down into the icon selector popup. State will update when icon is selected
					setDialogContent(<IconSelectorPopup dialogResult={dialogResult} setDialogResult={setDialogResult} />);
					toggleDialog();
				}}>Open Dialogue</button>
				<DialogBase onCancel={toggleDialog} onSubmit={iconSelected} ref={dialogRef}>
					{dialogContent}
				</DialogBase>
				<div>
					{currentIcon && currentIcon != "" && <img src={"/icons/default/" + currentIcon} width="128" height="128"/>}
				</div>
			</div>
			<SidebarBase>
				<NewNode/>
			</SidebarBase>
		</>

	);
}

export default App
