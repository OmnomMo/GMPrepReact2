import './App.css'
import SidebarBase from './Dialogues/SideBarBase';
import NewNode from './Dialogues/NewNodePopup/NewNode';



function App() {


	return (
		<>
			<SidebarBase rightSide={false}>
			</SidebarBase>
			<SidebarBase rightSide={true}>
				<NewNode/>
			</SidebarBase>
		</>

	);
}

export default App
