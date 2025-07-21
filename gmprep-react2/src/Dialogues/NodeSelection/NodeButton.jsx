import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../Contexts";

export default function NodeButton({defaultNodeData}) {
	const [nodeData] = useState(defaultNodeData);
	const {setCurrentNodeData} = useContext(GlobalContext);
	const {setDraggedNode} = useContext(GlobalContext);
	const startDrag = useRef(false);
	

	return (<>
		<img
			src={"./icons/default/" + nodeData.mapIconPath}
			width={64}
			height={64}
			className="unselectable m-2"
			draggable="false"
			onMouseDown={() => {
				startDrag.current = true;
				}
			}
			onMouseLeave={() => {
				if (startDrag.current) {
					startDrag.current = false;
					setDraggedNode(nodeData);
				}
			}}
			onMouseUp={() => {
				startDrag.current = false;
				setCurrentNodeData(nodeData);
			}}
		/>
	</>)
}