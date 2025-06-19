
import {useEffect, useState } from "react";

function IconSelectorPopup({setDialogResult}) {

	const [iconData, setIconData] = new useState([]);
	const [selectedIcon, setSelectedIcon] = new useState(null);


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
				console.log(response)
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
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
			setDialogResult("");
			targetIcon.className = "deselected";
		} else {
			console.log(targetIcon.id);
			targetIcon.className="selected";
			setSelectedIcon(targetIcon);
			setDialogResult(targetIcon.id);
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
				</div>

			</form>
		</>
	)
}

export default IconSelectorPopup;