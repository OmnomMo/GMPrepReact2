import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GlobalContext } from './Contexts';
import { useRef, useState } from 'react';
import { defaultNode } from './Globals/DefaultNode';
import Home from './Home';
import HeaderBar from './HeaderBar';
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
					<HeaderBar />
					<Home />
				</GlobalContext.Provider>
			</QueryClientProvider>
		</>

	);
}

export default App
