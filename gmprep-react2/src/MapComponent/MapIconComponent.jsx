import { useContext, useRef } from "react"
import { GlobalContext } from "../Contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMapNode } from "../Dialogues/Requests/MapNodeRequests";

export default function MapIconComponent({ mapNodeData, mapHeight, posX, posY, scaleFactor = 1.0}) {

	const queryClient = useQueryClient();

	const deleteMapNodeMutation = useMutation({
		mutationFn: deleteMapNode,
	})


	const { setCurrentNodeData, setDraggedNode } = useContext(GlobalContext);
	const startDrag = useRef(false);

	return (<>
		<img
			src={"/icons/default/" + (mapNodeData?.node?.mapIconPath ?? "wyvern.png")}
			className='mapIcon'
			width={(mapNodeData.node?.mapIconSize ?? 64) * scaleFactor}
			height={(mapNodeData.node?.mapIconSize ?? 64) * scaleFactor}
			draggable='false'
			onMouseDown={(e) => {
				e.stopPropagation()
				startDrag.current = true;
			}}
			onMouseLeave={(e) => {
				if (startDrag.current) {
					setDraggedNode(mapNodeData.node);
					e.target.style.visibility = "hidden";
					deleteMapNodeMutation.mutate(
						{ mapNodeId: mapNodeData.id },
						{
							onSuccess: () => {
								return queryClient.invalidateQueries({ queryKey: ['MapNodes'] })
							},
						})
				}
			}}
			onMouseUp={() => {
				startDrag.current = false;
				setCurrentNodeData(mapNodeData.node)
			}}
			style={{
				transform: `
					translate(${mapNodeData.node.mapIconSize * scaleFactor / -2}px, ${mapNodeData.node.mapIconSize * scaleFactor / -2}px)
					translate(${0}px, ${mapHeight * -1}px)
					translate(${posX}px, ${posY}px)`,
				filter: " drop-shadow(3px 1px 3px #101010)",
			}}
		/>


	</>)
}