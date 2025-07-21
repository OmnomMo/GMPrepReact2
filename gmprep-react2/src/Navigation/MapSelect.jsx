import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../Contexts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CampaignButton from "../Dialogues/CampaignSelection/CampaignButton";
import NewMap from "../Dialogues/NewMap/NewMap";
import { requestCreateNewMap, requestDeleteMap, requestMaps } from "../Dialogues/Requests/Requests";


export default function MapSelect() {

	const queryClient = useQueryClient();

	const { campaignData, setMapData, userToken } = useContext(GlobalContext);
	const [creatingNewMap, setCreatingNewMap] = useState(false);
	const editedMapData = useRef(null)

	const { status, error, data: maps } = useQuery({
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

	function editMap(data) {
		editedMapData.current = data;
		setCreatingNewMap(true);
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

	function getImageSource(mapData) {
		if (mapData.externalImageUrl != "") {
			return mapData.externalImageUrl;
		}
		return "/maps/" + mapData.imagePath;
	}




	return (
		<div
			className="size-full"
			id="campaignSelect"
			style={{
				backgroundImage: "url(" + campaignData.imageLink + ")",
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
				{creatingNewMap &&
					<NewMap
						onSubmit={createNewMap}
						onCancel={() => {
							setCreatingNewMap(false);
						}}
						defaultData={editedMapData.current}
					/>
				}
				{!creatingNewMap &&
					<div className="w-170 p-10 self-center flex flex-col">
						<h1>MAP SELECT</h1>
						<ul className="bigButtonContainer self-center">
							{maps.map(map =>
								<CampaignButton
									key={"campaign-" + map.id}
									campaignData={map}
									onDelete={deleteMap}
									onSelect={selectMap}
									onEdit={editMap}
									imageSrc={getImageSource(map)} />
							)}
						</ul>
						<button className="m-4 self-center" onClick={() => {
							setCreatingNewMap(true);
						}}>New Map</button>
					</div>
				}
			</div>
		</div>
	)
}