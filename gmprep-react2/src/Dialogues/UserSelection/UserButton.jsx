export default function UserButton({ userName, userId, onSelected, onDeleted}) {
	return (
		<div className="flex flex-row w-100">
			<div
				className="flex-grow m-4 p-2 bg-gray-700"
				onClick={() => {
					onSelected(userId, userName)
				}}>
				<p>{userName}</p>
			</div>
			<img
				className="self-center"
				src="./icons/ui/delete_icon.png"
				onClick={() => {
					onDeleted(userId)
				}}
			/>
		</div>
	)
}