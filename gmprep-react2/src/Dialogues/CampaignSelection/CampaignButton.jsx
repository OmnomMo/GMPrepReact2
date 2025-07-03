export default function CampaignButton({campaignData, onSelect, onDelete}) {

	return (
		<div
			name="CampaignButton"
			className="relative bg-green-900 h-100 w-100 m-3"
			onClick={() => {
				onSelect(campaignData);
			}}
			>
			<h3 className="m-5">{campaignData.name}</h3>
			<p>{campaignData.description}</p>
			<img
				className="absolute bottom-0 right-0 m-2"
				src="/icons/ui/delete_icon.png"
				onClick={(e) => {
					onDelete(campaignData.id);
					e.stopPropagation();
				}}/> 
		</div>
	)
}