
import { useEffect, useState } from "react";

function IconSelectorPopup({ setDialogResult, defaultIconSize}) {

	const [iconData, setIconData] = new useState([]);
	const [selectedIcon, setSelectedIcon] = new useState(null);
	const [iconSize, setIconSize] = new useState(defaultIconSize)


	const getData = () => {
		fetch('DefaultIcons.json'
			, {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}
		)
			.then(function (response) {
//				console.log(response)
				return response.json();
			})
			.then(function (myJson) {
//				console.log(myJson);
				setIconData(myJson);
			});
	}
	useEffect(() => {
		getData()
	}, [])


	function iconSelected(e) {

		let targetIcon = e.target;

		if (selectedIcon != null) {
			selectedIcon.className = "deselected";
		}

		if (selectedIcon === targetIcon) {
			setSelectedIcon(null);
			setDialogResult({icon: "", iconSize: iconSize});
			targetIcon.className = "deselected";
		} else {
			console.log(targetIcon.id);
			targetIcon.className = "selected";
			setSelectedIcon(targetIcon);
			setDialogResult({icon: targetIcon.id, iconSize: iconSize});
		}

	}

	return (
		<>
			<form method="dialog" >
				<h1>Select an icon!</h1>
				<div className="h-100 overflow-y-scroll" >
					<div className=" columns-5 w-100 ">
						{
							iconData && iconData.length > 0 && iconData.map(
								(icon) => <img className="deselected" id={icon.Name} key={icon.Name} src={"/icons/default/" + icon.Name} height="64" width="64" onClick={iconSelected} />)
						}
					</div>
					<p>Icon Size:</p>
					<select defaultValue={defaultIconSize ?? "64"} name="mapIconSize" onChange={(e) => {
						setIconSize(e.target.value);
						setDialogResult({icon: selectedIcon.id, iconSize: iconSize});
					}}>
						<option value="32">32</option>
						<option value="64">64</option>
						<option value="96">96</option>
					</select>
				</div>

			</form>
		</>
	)
}

export default IconSelectorPopup;