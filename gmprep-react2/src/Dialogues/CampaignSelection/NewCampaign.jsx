import { useRef, useState } from "react";
import EditeableHeader from "../../EditeableFields/EditeableHeader";
import EditeableMultiline from "../../EditeableFields/EditeableMultiline";


export default function NewCampaign({ onCancel, onSubmit, defaultData}) {

	const name = useRef("Campaign Name");
	const description = useRef("");
	const [imageLink, setImageLink] = useState(defaultData == null ? "" : defaultData.imageLink);


	function onNameChanged(newName) {
		name.current = newName;
	}

	function onDescriptionChanged(newDescription) {
		description.current = newDescription
	}

	return (<div className="w-full flex justify-center">
		<div
			style={{
				backgroundColor: "#ffffff03",
				backdropFilter: "blur(20px)",
			}}
			className="flex-col justify-content-center w-170 p-10"
		>
			<EditeableHeader
				defaultValue={defaultData == null ? "Campaign Name" : defaultData.name}
				onChanged={onNameChanged}
			/>
			<EditeableMultiline
				labelName={"Description"}
				defaultValue={defaultData == null ? "" : defaultData.description}
				onChanged={onDescriptionChanged}
			/>
			<div className="bg-black/5 p-2 mt-2 mb-2">
				Custom campaign image link:
				<input
					className="ml-4 p-1"
					type="text"
					defaultValue={imageLink}
					onChange={e => {
						setImageLink(e.target.value);
					}}
				></input>
				{imageLink != "" && 
				<div className="flex flex-row justify-center">
					<img src={imageLink} className="w-30 h-30 m-6 object-cover" />
				</div>}
			</div>

			<button
				onClick={() => {onCancel();}}
			>Cancel</button>
			<button
				onClick={() => {
					onSubmit(
						{name: name.current,
						description: description.current,
						imageLink: imageLink,
						id: defaultData == null ? 0 : defaultData.id,
					});
				}}
			>Submit</button>

		</div>
	</div>
	);
}