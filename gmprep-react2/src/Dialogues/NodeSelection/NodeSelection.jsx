import { useQuery  } from "@tanstack/react-query"
import { defaultNode } from "../../Globals/DefaultNode";
import { NodeContext } from "../../Contexts";
import NodeButton from "./NodeButton";
import { useContext, useRef } from "react";


async function getAllNodes() {

	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	}
	return fetch('http://localhost:5140/Nodes', requestOptions)
		.then(result => result.json());
}

export default function NodeSelection() {

	const keyIteration = useRef(0);
	const {setCurrentNodeData} = useContext(NodeContext);
	//const queryClient = useQueryClient();

		const {
		status,
		error,
		data: nodes,
	} = useQuery({
		queryKey: ['AllNodes'],
		queryFn: getAllNodes,
	})

	if (status == "error") {
		console.log(error);
		return <div className="bg-red-500">Error!</div>
	}

	if (status == "pending") {
		return <h2>Loading...</h2>
	}

	if (status == "success") {
		keyIteration.current += 1;
		console.log(nodes)
		return (
			<div className="w-full flex flex-wrap" id={"NodeSelection" + keyIteration.current} key={"NodeSelection" + keyIteration.current}>
				{nodes.map(node => <NodeButton defaultNodeData={node} key={node.id + node.name}/>)}
				<img src="/icons/ui/plus_icon.png" width={64} height={64} className="m-2" onClick={() => {setCurrentNodeData({...defaultNode})}} />
			</div>
		)
	}

}