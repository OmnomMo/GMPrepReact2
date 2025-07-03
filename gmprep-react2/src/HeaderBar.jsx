export default function HeaderBar() {

	return (
			<div name="headerBar" className='flex flex-row absolute top-0 left-0 w-full bg-blue-800'>
				<div className="flex-grow" />
				<img className="m-1" width={32} src="/icons/ui/map_icon.png" />
				<img className="m-1" width={32} src="/icons/ui/campaign_icon.png" />
				<img className="m-1" width={32} src="/icons/ui/logout_icon.png" />
			</div>
	)
}