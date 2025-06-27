import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SidebarBase from './Dialogues/SideBarBase';
import NewNode from './Dialogues/NewNodePopup/NewNode';
import NodeSelection from './Dialogues/NodeSelection/NodeSelection';
import { NodeContext } from './Contexts';
import { useRef, useState } from 'react';
import { defaultNode } from './Globals/DefaultNode';
import MapComponent from './MapComponent/MapComponent';
const queryClient = new QueryClient();

function App() {
	const [currentNodeData, setCurrentNodeData] = useState(defaultNode)
	const draggingMap = useRef(false);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<NodeContext.Provider value={{
					currentNodeData: currentNodeData,
					setCurrentNodeData: setCurrentNodeData,
					draggingMap: draggingMap,
				}}>
					<div
						id="MapDragContainer"
						onMouseUp={() => {
							draggingMap.current = false;
						}}
						onMouseLeave={() => {
							draggingMap.current = false;
						}}>
						<MapComponent />
						<SidebarBase rightSide={false} minWidth={200}>
							<NodeSelection />
						</SidebarBase>
						<SidebarBase rightSide={true} key={currentNodeData?.id ?? "newNode"}>
							<NewNode />
						</SidebarBase>
					</div>
				</NodeContext.Provider>
			</QueryClientProvider>
		</>

	);
}

export default App
