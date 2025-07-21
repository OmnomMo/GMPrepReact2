import { useContext } from "react"
import { GlobalContext } from "./Contexts"
import { googleLogout } from "@react-oauth/google"

export default function HeaderBar() {

	const {userData, campaignData, mapData, setUserData, setUserToken, setCampaignData, setMapData} = useContext(GlobalContext)

	function getHeaderText() {
		let mapString = mapData.id != -1 ? " - " + mapData.name : "";
		let campaignString = campaignData.id != -1 ? " - " + campaignData.name : "";
		let userString = userData != null ? userData.given_name : "";
		return userString + campaignString + mapString;
	}


	return (
			<div name="headerBar" className='flex flex-row absolute top-0 left-0 w-full bg-gray-800 z-30'>
				<p className="m-2">{getHeaderText()}</p>
				<div className="flex-grow" />
				<img
					className="m-1"
					width={32}
					src="./icons/ui/map_icon.png"
					hidden = {mapData.id == -1 || campaignData.id == -1 || userData == null}
					onClick={() => {
						setMapData({name: "", id: -1});
					}}
				/>
				<img
					className="m-1"
					width={32}
					src="./icons/ui/campaign_icon.png"
					hidden = {campaignData.id == -1 || userData == null}
					onClick={() => {
						setMapData({name: "", id: -1});
						setCampaignData({name: "", id: -1});
					}}
					/>
				<img
					className="m-1"
					width={32}
					src="./icons/ui/logout_icon.png"
					hidden = {userData == null}
					onClick={() => {
						setMapData({name: "", id: -1});
						setCampaignData({name: "", id: -1});
						setUserData(null);
						setUserToken(null);
						googleLogout();
					}}
					/>
			</div>
	)
}