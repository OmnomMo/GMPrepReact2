import { useQuery  } from "@tanstack/react-query"
import NodeButton from "./NodeButton";


async function getAllNodes() {

	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	}
	return fetch('http://localhost:5140/Nodes', requestOptions)
		.then(result => result.json());
}

export default function NodeSelection() {

	//const queryClient = useQueryClient();

	const {
		status,
		error,
		data: nodes,
	} = useQuery({
		queryKey: ['AllNodes'],
		queryFn: getAllNodes
	})

	if (status == "error") {
		console.log(error);
		return <div className="bg-red-500">Error!</div>
	}

	if (status == "pending") {
		return <h2>Loading...</h2>
	}

	if (status == "success") {
		console.log(nodes)
		return (
			<div>
				{nodes.map(node => <NodeButton defaultNodeData={node} key={node.name}/>)}
			</div>
		)
	}

}