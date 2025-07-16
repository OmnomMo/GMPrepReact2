import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GlobalContext } from './Contexts';
import { useEffect, useRef, useState } from 'react';
import { defaultNode } from './Globals/DefaultNode';
import { GoogleOAuthProvider } from '@react-oauth/google'
import Home from './Home';
import HeaderBar from './HeaderBar';
const queryClient = new QueryClient();

function App() {
	const [currentNodeData, setCurrentNodeData] = useState(defaultNode);
	const [draggedNode, setDraggedNode] = useState(null);
	const [droppedNodeInfo, setDroppedNodeInfo] = useState({ node: null, location: { x: 0, y: 0 } })
	const draggingMap = useRef(false);


	const storedUserData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;
	const storedCampaignData = localStorage.getItem("campaignData") ? JSON.parse(localStorage.getItem("campaignData")) : { name: "", id: -1 };
	const storedMapData = localStorage.getItem("mapData") ? JSON.parse(localStorage.getItem("mapData")) : { name: "", id: -1 };

	//Previous user, campaign and map are stored in local storage for now.
	const [userData, setUserData] = useState(storedUserData)
	const [userToken, setUserToken] = useState(null);
	const [campaignData, setCampaignData] = useState(storedCampaignData)
	const [mapData, setMapData] = useState(storedMapData)

	useEffect(() => {
		localStorage.setItem("userData", JSON.stringify(userData));
		localStorage.setItem("campaignData", JSON.stringify(campaignData));
		localStorage.setItem("mapData", JSON.stringify(mapData))
	}, [userData, campaignData, mapData])

	return (
		<>
			<GoogleOAuthProvider clientId='22535597810-ml4s14qa3sq76doaohsjkf3r1vjpv1jo.apps.googleusercontent.com'>
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
						userToken: userToken,
						setUserToken: setUserToken,
						campaignData: campaignData,
						setCampaignData: setCampaignData,
						mapData: mapData,
						setMapData: setMapData,
					}}>
						<HeaderBar />
						<Home />
					</GlobalContext.Provider>
				</QueryClientProvider>
			</GoogleOAuthProvider>
		</>

	);
}

export default App
