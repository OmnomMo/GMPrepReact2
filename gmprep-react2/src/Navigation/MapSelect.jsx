import { useContext } from "react";
import { GlobalContext } from "../Contexts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CampaignButton from "../Dialogues/CampaignSelection/CampaignButton";


async function requestMaps({queryKey}) {
	const [_key, campaignId] = queryKey;
	const requestParams = {
		method: 'GET',
		header: {'Content-Type': 'application/json'},
	}
	console.log("Fetching maps for campaign " + campaignId)
	return fetch('http://localhost:5140/Campaigns/Maps/' + campaignId, requestParams)
		.then(result => result.json())
}

async function requestCreateNewMap({data, campaignId}) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}
	console.log("Adding map")
	return fetch('http://localhost:5140/Campaigns/Maps/Create/' + campaignId, requestOptions)
		.then(result => result.json())
		.then(json => {
			console.log(json);
			return json;
		})
}

async function requestDeleteMap({mapId}) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'},
	}
	console.log("Deleting Campaign")
	return fetch('http://localhost:5140/Campaigns/Maps/Delete/' + mapId, requestOptions)
}

export default function MapSelect() {

	const queryClient = useQueryClient();

	const {campaignData, setMapData} = useContext(GlobalContext);

	const {status, error, data: maps} = useQuery({
		queryFn: requestMaps,
		queryKey: ['AllMaps', campaignData.id],
	})

	const createNewMapMutation = useMutation({
		mutationFn: requestCreateNewMap,
	})

	const deleteMapMutation = useMutation({
		mutationFn: requestDeleteMap,
	})

	function createNewMap(name) {
		createNewMapMutation.mutate({
			data: {name: name},
			campaignId: campaignData.id,
		}, {
			onSuccess: (data) => {
				console.log("Created new Map!");
				console.log(data);
				queryClient.invalidateQueries(['AllMaps']);
				
			}
		})
	}

	function selectMap(data) {
		setMapData(data)
	}

	function deleteMap(mapId) {

		if (!confirm("Are you sure you want to delete this Map?\nThis cannot be undone.")) {
			return
		}

		deleteMapMutation.mutate({
			mapId
		}, {
			onSuccess: () => {
				console.log("Deleted map!")
				queryClient.invalidateQueries(['AllMaps']);
			}
		})
	}

	if (status == 'pending') {
		return (<div>Loading Maps...</div>)
	}

	if (status == 'error') {
		return (<div>ERROR LOADING MAPS - {error}</div>)
	}

	return (
		<>
			<h1>MAP SELECT</h1>
			<ul className="bigButtonContainer">
				{maps.map(map =>
					<CampaignButton
						key={"campaign-"+map.id}
						campaignData={map}
						onDelete={deleteMap}
						onSelect={selectMap}/>
				)}
			</ul>
			<button className="m-4" onClick={() => {
				let newMapName = prompt("New Map Name:");
				if (newMapName != "") {
					createNewMap(newMapName);
				}
			}}>New Map</button>
		</>
	)
}