import { useContext } from "react"
import { GlobalContext } from "./Contexts"

export default function HeaderBar() {

	const {userData, campaignData, mapData, setUserData, setCampaignData, setMapData} = useContext(GlobalContext)



	return (
			<div name="headerBar" className='flex flex-row absolute top-0 left-0 w-full bg-blue-800 z-30'>
				<p className="m-2">{userData.name} - {campaignData.name} - {mapData.name}</p>
				<div className="flex-grow" />
				<img
					className="m-1"
					width={32}
					src="/icons/ui/map_icon.png"
					hidden = {mapData.id == -1 || campaignData.id == -1 || userData.id == -1}
					onClick={() => {
						setMapData({name: "", id: -1});
					}}
				/>
				<img
					className="m-1"
					width={32}
					src="/icons/ui/campaign_icon.png"
					hidden = {campaignData.id == -1 || userData.id == -1}
					onClick={() => {
						setMapData({name: "", id: -1});
						setCampaignData({name: "", id: -1});
					}}
					/>
				<img
					className="m-1"
					width={32}
					src="/icons/ui/logout_icon.png"
					hidden = {userData.id == -1}
					onClick={() => {
						setMapData({name: "", id: -1});
						setCampaignData({name: "", id: -1});
						setUserData({name: "", id: -1});
					}}
					/>
			</div>
	)
}