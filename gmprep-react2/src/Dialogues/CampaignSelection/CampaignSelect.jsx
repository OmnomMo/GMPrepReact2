import { useContext, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CampaignButton from "./CampaignButton";
import { GlobalContext } from "../../Contexts";
import { requestCampaigns, requestCreateNewCampaign, requestDeleteCampaign } from "../Requests/Requests";
import NewCampaign from "./NewCampaign";
import Loading from "../../Utils/Loading";



export default function CampaignSelect() {

	const queryClient = useQueryClient();
	const { userToken, setCampaignData } = useContext(GlobalContext);
	const [editingCampaign, setEditingCampaign] = useState(false);
	const editedCampaignData = useRef(null);

	const { status, error, data: campaigns } = useQuery({
		queryFn: requestCampaigns,
		queryKey: ['AllCampaigns', userToken],
	})

	const createNewCampaignMutation = useMutation({
		mutationFn: requestCreateNewCampaign,
	})

	const deleteCampaignMutation = useMutation({
		mutationFn: requestDeleteCampaign,
	})


	function createNewCampaign(data) {
		editedCampaignData.current = null;
		setEditingCampaign(false)

		createNewCampaignMutation.mutate({
			data: data,
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

	function editCampaign(data) {
		editedCampaignData.current = data;
		setEditingCampaign(true);
	}

	if (status == 'pending') {
		return (
			<div className="size-full content-center">
				<Loading />
				<p>Loading Campaigns...</p>
			</div>
		)
	}

	if (status == 'error') {
		return (<div>ERROR LOADING CAMPAIGNS - {error}</div>)
	}



	return (
		<div
			className="size-full fadeIn"
			id="campaignSelect"
			style={{
				backgroundImage: "url(https://cdna.artstation.com/p/assets/images/images/002/107/616/large/karin-wittig-map-scyllhia-as.jpg?1457360365)",
				backgroundSize: "cover",
			}}
		>
			<div
				className="w-full h-full pt-10 flex flex-col justify-center"
				style={{
					backdropFilter: "blur(10px)",
					backgroundColor: "#5858587c",
				}}
			>
				{editingCampaign &&
					<NewCampaign
						onSubmit={data => {
							createNewCampaign(data)
						}}
						onCancel={() => {
							setEditingCampaign(false);
						}}
						defaultData={editedCampaignData.current}
					/>
				}
				{!editingCampaign &&
					<>
						<h1>CAMPAIGN SELECT</h1>
						<ul id="CampaignButtonContainer" className="bigButtonContainer self-center">
							{campaigns.map(campaign =>
								<CampaignButton
									key={"campaign-" + campaign.id}
									campaignData={campaign}
									onDelete={deleteCampaign}
									onSelect={selectCampaign}
									imageSrc={campaign.imageLink}
									onEdit={editCampaign} />
							)}
						</ul>
						<button className="m-4 self-center" onClick={() => {
							editedCampaignData.current = null;
							setEditingCampaign(true);
						}}>New Campaign</button>
					</>
				}
			</div>
		</div>
	)
}