import { useContext } from "react"
import { GlobalContext } from "./Contexts"
import Login from "./Navigation/Login";
import CampaignSelect from "./Navigation/CampaignSelect";
import MapSelect from "./Navigation/MapSelect";

export default function Home() {

	const { userData, campaignData, mapData, draggingMap, currentNodeData } = useContext(GlobalContext);

	if (userData.id == -1) {
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
		<MapComponent />
		<SidebarBase rightSide={false} minWidth={200}>
			<NodeSelection />
		</SidebarBase>
		<SidebarBase rightSide={true} key={currentNodeData?.id ?? "newNode"}>
			<NewNode />
		</SidebarBase>
	</div>)

}