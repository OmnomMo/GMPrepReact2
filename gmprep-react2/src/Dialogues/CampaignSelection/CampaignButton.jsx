export default function CampaignButton({ campaignData, onSelect, onDelete }) {

	return (
		<div
			name="CampaignButton"
			className="relative h-100 min-w-80 m-3"
			style={{
				backgroundImage: "url(/maps/" + campaignData.imagePath + ")",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundColor: "#505050",
			}}
			onClick={() => {
				onSelect(campaignData);
			}}
		>
			<div name="CampaignButtonContent"
				className="w-full h-full p-5"
				style={{
					backgroundColor: "#000000BB",
					backdropFilter: "blur(5px)"
				}}>
				<h3 >{campaignData.name}</h3>
				<p className="mt-6">{campaignData.description}</p>

				<img
					className="absolute bottom-0 right-0 m-2"
					src="/icons/ui/delete_icon.png"
					onClick={(e) => {
						onDelete(campaignData.id);
						e.stopPropagation();
					}} />
			</div>
		</div>
	)
}