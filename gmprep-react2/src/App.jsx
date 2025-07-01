import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SidebarBase from './Dialogues/SideBarBase';
import NewNode from './Dialogues/NewNodePopup/NewNode';
import NodeSelection from './Dialogues/NodeSelection/NodeSelection';
import { NodeContext } from './Contexts';
import { useRef, useState } from 'react';
import { defaultNode } from './Globals/DefaultNode';
import MapComponent from './MapComponent/MapComponent';
import DragAndDrop from './DragAndDrop/DragAndDrop';
const queryClient = new QueryClient();

function App() {
	const [currentNodeData, setCurrentNodeData] = useState(defaultNode);
	const [draggedNode, setDraggedNode] = useState(null);
	const [droppedNodeInfo, setDroppedNodeInfo] = useState({node: null, location:{x:0, y:0}})
	const draggingMap = useRef(false);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<NodeContext.Provider value={{
					currentNodeData: currentNodeData,
					setCurrentNodeData: setCurrentNodeData,
					draggedNode: draggedNode,
					setDraggedNode: setDraggedNode,
					droppedNodeInfo: droppedNodeInfo,
					setDroppedNodeInfo: setDroppedNodeInfo,
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
						<DragAndDrop />
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
