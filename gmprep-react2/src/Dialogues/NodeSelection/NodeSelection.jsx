import { useQuery  } from "@tanstack/react-query"
import { defaultNode } from "../../Globals/DefaultNode";
import { GlobalContext } from "../../Contexts";
import NodeButton from "./NodeButton";
import { useContext, useRef } from "react";


async function getAllNodes({queryKey}) {
	const [_key, campaignId, userToken] = queryKey;

	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	}
	console.log("Requesting Nodes")
	return fetch(`http://localhost:5140/Nodes/All/${campaignId}/${userToken}`, requestOptions)
		.then(result => result.json())
		.then(json => {
			console.log(json);
			return json;
		});
}

export default function NodeSelection() {

	const keyIteration = useRef(0);
	const {userToken, setCurrentNodeData, campaignData} = useContext(GlobalContext);
	//const queryClient = useQueryClient();

		const {
		status,
		error,
		data: nodes,
	} = useQuery({
		queryKey: ['AllNodes', campaignData.id, userToken],
		queryFn: getAllNodes,
	})

	function resetNodeData() {
		const newNode = {...defaultNode};
		setCurrentNodeData(newNode);
	}

	if (status == "error") {
		console.log(error);
		return <div className="bg-red-500">Error!</div>
	}

	if (status == "pending") {
		return <h2>Loading...</h2>
	}

	if (status == "success") {
		keyIteration.current += 1;
		return (
			<div className="w-full flex flex-wrap" id={"NodeSelection" + keyIteration.current} key={"NodeSelection" + keyIteration.current}>
				{nodes.map(node => <NodeButton defaultNodeData={node} key={node.id + node.name}/>)}
				<img
					src="/icons/ui/plus_icon.png"
					width={64}
					height={64}
					className="m-2"
					draggable="false"
					onMouseUp={() => {
						resetNodeData();
					}}
					/>
			</div>
		)
	}

}