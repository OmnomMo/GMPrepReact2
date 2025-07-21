export default function CampaignButton({ campaignData, onSelect, onDelete, onEdit, imageSrc }) {


	return (
		<div
			name="CampaignButton"
			className="relative h-100 min-w-80 m-5"
			style={{
				backgroundImage: "url(" + imageSrc + ")",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundColor: "#505050",
				cursor: "pointer",
			}}
			onClick={() => {
				onSelect(campaignData);
			}}
		>
			<div name="CampaignButtonContent"
				className="w-full h-full p-5"
				style={{
					backgroundColor: "#0000009f",
					backdropFilter: "blur(5px)"
				}}>
				<h3 >{campaignData.name}</h3>
				<p className="mt-6 text-left whitespace-pre-wrap">{campaignData.description}</p>
				<div className="flex align-right absolute bottom-0 right-0">
					<img
						className="m-1"
						src="./icons/ui/wrench_icon.png"
						onClick={(e) => {
							onEdit(campaignData);
							e.stopPropagation();
						}} />
					<img
						className="m-1"
						src="./icons/ui/delete_icon.png"
						onClick={(e) => {
							onDelete(campaignData.id);
							e.stopPropagation();
						}} />
				</div>
			</div>
		</div>
	)
}