import { useContext } from "react"
import { GlobalContext } from "./Contexts"
import Login from "./Navigation/Login";
import CampaignSelect from "./Navigation/CampaignSelect";
import MapSelect from "./Navigation/MapSelect";
import MapComponent from './MapComponent/MapComponent';
import DragAndDrop from './DragAndDrop/DragAndDrop';
import SidebarBase from './Dialogues/SideBarBase';
import NewNode from './Dialogues/NewNodePopup/NewNode';
import NodeSelection from './Dialogues/NodeSelection/NodeSelection';



export default function Home() {

	const { userToken, campaignData, mapData, draggingMap, currentNodeData } = useContext(GlobalContext);

	if (userToken == null) {
		return <Login />
	}

	if (campaignData.id == -1) {
		return <CampaignSelect />
	}

	if (mapData.id == -1) {
		return <MapSelect />
	}

	return (
		<div
			id="MapWindow"
			onMouseUp={() => {
				draggingMap.current = false;
			}}
			onMouseLeave={() => {
				draggingMap.current = false;
			}}>
			<DragAndDrop />
			<div id="sideBars">
				<SidebarBase rightSide={false} minWidth={200}>
					<NodeSelection />
				</SidebarBase>
				<SidebarBase rightSide={true} key={currentNodeData?.id ?? "newNode"}>
					<NewNode />
				</SidebarBase>
			</div>
			<MapComponent />
		</div>)

}