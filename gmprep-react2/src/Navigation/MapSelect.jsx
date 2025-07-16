import { useContext, useState } from "react";
import { GlobalContext } from "../Contexts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CampaignButton from "../Dialogues/CampaignSelection/CampaignButton";
import EditeableHeader from "../EditeableFields/EditeableHeader";
import EditeableMultiline from "../EditeableFields/EditeableMultiline";
import NewMap from "../Dialogues/NewMap/NewMap";


async function requestMaps({queryKey}) {
	const [_key, campaignId, userToken] = queryKey;
	const requestParams = {
		method: 'GET',
		header: {'Content-Type': 'application/json'},
	}
	console.log("Fetching maps for campaign " + campaignId)
	return fetch('http://localhost:5140/Campaigns/Maps/' + campaignId + "/" + userToken, requestParams)
		.then(result => result.json())
}

async function requestCreateNewMap({data, campaignId, userToken}) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}
	console.log("Adding map")
	return fetch('http://localhost:5140/Campaigns/Maps/Create/' + campaignId + "/" + userToken, requestOptions)
		.then(result => result.json())
		.then(json => {
			console.log(json);
			return json;
		})
}

async function requestDeleteMap({mapId, userToken}) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'},
	}
	console.log("Deleting Campaign")
	return fetch('http://localhost:5140/Campaigns/Maps/Delete/' + mapId + "/" + userToken, requestOptions)
}

export default function MapSelect() {

	const queryClient = useQueryClient();

	const {campaignData, setMapData, userToken} = useContext(GlobalContext);
	const [creatingNewMap, setCreatingNewMap] = useState(false);

	const {status, error, data: maps} = useQuery({
		queryFn: requestMaps,
		queryKey: ['AllMaps', campaignData.id, userToken],
	})

	const createNewMapMutation = useMutation({
		mutationFn: requestCreateNewMap,
	})

	const deleteMapMutation = useMutation({
		mutationFn: requestDeleteMap,
	})

	function createNewMap(data) {
		setCreatingNewMap(false);
		createNewMapMutation.mutate({
			data: data,
			campaignId: campaignData.id,
			userToken: userToken,
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
			mapId: mapId,
			userToken: userToken,
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

	

	if (creatingNewMap) {
		return(
			<NewMap
				onSubmit={createNewMap}
				onCancel={() => {
					setCreatingNewMap(false);
				}}
				/>
		);
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
				setCreatingNewMap(true);
			}}>New Map</button>
		</>
	)
}