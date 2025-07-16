import { useContext } from "react";
import { GlobalContext } from "../Contexts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CampaignButton from "../Dialogues/CampaignSelection/CampaignButton";


async function requestCampaigns({queryKey}) {
	const [_key, userToken] = queryKey;
	const requestParams = {
		method: 'GET',
		header: {'Content-Type': 'application/json'},
	}
	console.log("Fetching campaigns for user " + userToken)
	return fetch('http://localhost:5140/Campaigns/' + userToken, requestParams)
		.then(result => result.json())
}

async function requestCreateNewCampaign({data, userToken}) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}
	console.log("Adding campaign")
	return fetch('http://localhost:5140/Campaigns/Create/' + userToken, requestOptions)
		.then(result => result.json())
		.then(json => {
			console.log(json);
			return json;
		})
}

async function requestDeleteCampaign({campaignId, userToken}) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'},
	}
	console.log("Deleting Campaign")
	return fetch('http://localhost:5140/Campaigns/Delete/' + campaignId + "/" + userToken, requestOptions)
}

export default function CampaignSelect() {

	const queryClient = useQueryClient();

	const { userToken, setCampaignData} = useContext(GlobalContext);

	const {status, error, data: campaigns} = useQuery({
		queryFn: requestCampaigns,
		queryKey: ['AllCampaigns', userToken],
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
			userToken: userToken,
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
			campaignId: campaignId,
			userToken: userToken,
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