import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SidebarBase from './Dialogues/SideBarBase';
import NewNode from './Dialogues/NewNodePopup/NewNode';
import NodeSelection from './Dialogues/NodeSelection/NodeSelection';
import { GlobalContext } from './Contexts';
import { useRef, useState } from 'react';
import { defaultNode } from './Globals/DefaultNode';
import MapComponent from './MapComponent/MapComponent';
import DragAndDrop from './DragAndDrop/DragAndDrop';
import Home from './Home';
const queryClient = new QueryClient();

function App() {
	const [currentNodeData, setCurrentNodeData] = useState(defaultNode);
	const [draggedNode, setDraggedNode] = useState(null);
	const [droppedNodeInfo, setDroppedNodeInfo] = useState({node: null, location:{x:0, y:0}})
	const [userData, setUserData] = useState({name: "", id: -1})
	const [campaignData, setCampaignData] = useState({name: "", id: -1})
	const [mapData, setMapData] = useState({name: "", id: -1})
	const draggingMap = useRef(false);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<GlobalContext.Provider value={{
					currentNodeData: currentNodeData,
					setCurrentNodeData: setCurrentNodeData,
					draggedNode: draggedNode,
					setDraggedNode: setDraggedNode,
					droppedNodeInfo: droppedNodeInfo,
					setDroppedNodeInfo: setDroppedNodeInfo,
					draggingMap: draggingMap,
					userData: userData,
					setUserData: setUserData,
					campaignData: campaignData,
					setCampaignData: setCampaignData,
					mapData: mapData,
					setMapData: setMapData,
				}}>
					<Home />
				</GlobalContext.Provider>
			</QueryClientProvider>
		</>

	);
}

export default App
