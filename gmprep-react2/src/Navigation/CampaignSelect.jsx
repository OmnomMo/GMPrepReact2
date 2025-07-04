import { useContext } from "react";
import { GlobalContext } from "../Contexts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CampaignButton from "../Dialogues/CampaignSelection/CampaignButton";


async function requestCampaigns({queryKey}) {
	const [_key, userId] = queryKey;
	const requestParams = {
		method: 'GET',
		header: {'Content-Type': 'application/json'},
	}
	console.log("Fetching campaigns for user " + userId)
	return fetch('http://localhost:5140/Campaigns/' + userId, requestParams)
		.then(result => result.json())
}

async function requestCreateNewCampaign({data, userId}) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}
	console.log("Adding campaign")
	return fetch('http://localhost:5140/Campaigns/Create/' + userId, requestOptions)
		.then(result => result.json())
		.then(json => {
			console.log(json);
			return json;
		})
}

async function requestDeleteCampaign({campaignId}) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'},
	}
	console.log("Deleting Campaign")
	return fetch('http://localhost:5140/Campaigns/Delete/' + campaignId, requestOptions)
}

export default function CampaignSelect() {

	const queryClient = useQueryClient();

	const {userData, setCampaignData} = useContext(GlobalContext);

	const {status, error, data: campaigns} = useQuery({
		queryFn: requestCampaigns,
		queryKey: ['AllCampaigns', userData.id],
	})

	const createNewCampaignMutation = useMutation({
		mutationFn: requestCreateNewCampaign,
	})

	const deleteCampaignMutation = useMutation({
		mutationFn: requestDeleteCampaign,
	})


	function createNewCampaign(name) {
		createNewCampaignMutation.mutate({
			data: {name: name},
			userId: userData.id,
		}, {
			onSuccess: (data) => {
				console.log("Created new campaign!");
				console.log(data);
				queryClient.invalidateQueries(['AllCampaigns']);
				
			}
		})
	}

	function selectCampaign(data) {
		setCampaignData(data)
	}

	function deleteCampaign(campaignId) {

		if (!confirm("Are you sure you want to delete this campaign?\nAll nodes and maps that are part of this campaign will be deleted!\nThis cannot be undone.")) {
			return
		}

		deleteCampaignMutation.mutate({
			campaignId
		}, {
			onSuccess: () => {
				console.log("Deleted campaign!")
				queryClient.invalidateQueries(['AllCampaigns']);
			}
		})
	}

	if (status == 'pending') {
		return (<div>Loading Campaigns...</div>)
	}

	if (status == 'error') {
		return (<div>ERROR LOADING CAMPAIGNS - {error}</div>)
	}

	return (
		<>
			<h1>CAMPAIGN SELECT</h1>
			<ul className="bigButtonContainer">
				{campaigns.map(campaign =>
					<CampaignButton
						key={"campaign-"+campaign.id}
						campaignData={campaign}
						onDelete={deleteCampaign}
						onSelect={selectCampaign}/>
				)}
			</ul>
			<button className="m-4" onClick={() => {
				let newCampaignName = prompt("New Campaign Name:");
				if (newCampaignName != "" && newCampaignName != null) {
					createNewCampaign(newCampaignName);
				}
			}}>New Campaign</button>
		</>
	)
}