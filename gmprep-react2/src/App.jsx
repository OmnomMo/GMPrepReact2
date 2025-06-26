import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SidebarBase from './Dialogues/SideBarBase';
import NewNode from './Dialogues/NewNodePopup/NewNode';
import NodeSelection from './Dialogues/NodeSelection/NodeSelection';
import { NodeContext } from './Contexts';
import { useState } from 'react';
const queryClient = new QueryClient();

function App() {
	const [currentNodeData, setCurrentNodeData] = useState(null)

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<NodeContext.Provider value={{ currentNodeData: currentNodeData, setCurrentNodeData: setCurrentNodeData }}>
					<SidebarBase rightSide={false}>
						<NodeSelection />
					</SidebarBase>
					<SidebarBase rightSide={true} key={currentNodeData?.id ?? "newNode"}>
						<NewNode />
					</SidebarBase>
				</NodeContext.Provider>
			</QueryClientProvider>
		</>

	);
}

export default App
