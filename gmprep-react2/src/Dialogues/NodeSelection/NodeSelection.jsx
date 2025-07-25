import { useQuery } from "@tanstack/react-query"
import { defaultNode } from "../../Globals/DefaultNode";
import { GlobalContext } from "../../Contexts";
import NodeButton from "./NodeButton";
import { useContext, useRef, useState } from "react";
import { getAllNodes } from "../Requests/Requests";



export default function NodeSelection() {

	const keyIteration = useRef(0);
	const { userToken, setCurrentNodeData, campaignData } = useContext(GlobalContext);
	//const queryClient = useQueryClient();

	const [filtersActive, setFiltersActive] = useState(false);
	const [filterText, setFilterText] = useState("");
	const [filterCreatures, setFilterCreatures] = useState(false);
	const [filterLocations, setFilterLocations] = useState(false);

	const {
		status,
		error,
		data: nodes,
	} = useQuery({
		queryKey: ['AllNodes', campaignData.id, userToken],
		queryFn: getAllNodes,
	})

	function getFilteredNodes(nodes) {


		if (!filtersActive) {
			return nodes;
		}

		let filtered = nodes.filter(n => {
			let textMatch = true;
			if (filterText != "" && !n.name.toLowerCase().includes(filterText.toLowerCase())) {
				textMatch = false;
			}

			let typeMatch = true;
			if (filterCreatures && n["creatureInfo"] == null) {
				typeMatch = false;
			}
			if (filterLocations && n["locationInfo"] == null) {
				typeMatch = false;
			}



			return textMatch && typeMatch
		});
		return filtered;
	}

	function resetNodeData() {
		const newNode = { ...defaultNode };
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
			<div className="w-full">
				<div id="filterBar" className="bg-gray-100/10 m-2 p-2 w-max flex flex-row">
					<label id="CreatureFilter" className="toggleButton">
						<input
							type="checkbox"
							name="isCreature"
							checked={filtersActive}
							onChange={e => {
								setFiltersActive(e.target.checked);
							}}
						/>
						<span className="toggleBG"><img src="./icons/ui/filter_icon.png" className="p-1" /></span>
					</label>
					{filtersActive && <>

						<input
							type="text"
							autoFocus
							className="w-30 pl-2 ml-4 mr-4 outline-solid outline-orange-300 outline-1"
							defaultValue={filterText}
							onChange={e => {
								setFilterText(e.target.value);
							}}
						/>
						<label id="CreatureFilter" className="toggleButton">
							<input
								type="checkbox"
								name="isCreature"
								checked={filterCreatures}
								onChange={e => {
									setFilterCreatures(e.target.checked);
									if (e.target.checked) {
										setFilterLocations(false)
									}
								}}
							/>
							<span className="toggleBG"><img src="./icons/ui/character_icon.png" className="p-1" /></span>
						</label>
						<label id="LocationFilter" className="toggleButton ml-2">
							<input
								type="checkbox"
								name="isLocation"
								checked={filterLocations}
								onChange={e => {
									setFilterLocations(e.target.checked);
									if (e.target.checked) {
										setFilterCreatures(false)
									}
								}}
							/>
							<span className="toggleBG"><img src="./icons/ui/location_icon.png" className="p-1" /></span>
						</label>
					</>}

				</div>

				<div className="w-full flex flex-wrap" id={"NodeSelection" + keyIteration.current} key={"NodeSelection" + keyIteration.current}>
					{getFilteredNodes(nodes).map(node => <NodeButton defaultNodeData={node} key={node.id + node.name} />)}
					<img
						src="./icons/ui/plus_icon.png"
						width={64}
						height={64}
						className="m-2"
						draggable="false"
						onMouseUp={() => {
							resetNodeData();
						}}
					/>
				</div>
			</div>

		)
	}

}