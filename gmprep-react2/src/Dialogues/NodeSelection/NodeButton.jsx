import { useContext, useState } from "react";
import { NodeContext } from "../../Contexts";

export default function NodeButton({defaultNodeData}) {
	const [nodeData] = useState(defaultNodeData);
	const {setCurrentNodeData} = useContext(NodeContext);

	return (<>
		<img
			src={"/icons/default/" + nodeData.mapIconPath}
			width={64}
			height={64}
			className="m-2"
			onClick={() => setCurrentNodeData(nodeData)}
		/>
	</>)
}