
import { useEffect, useState } from "react";
import FilterButton from "../Utils/FilterButton";

function IconSelectorPopup({ setDialogResult, defaultIconSize, defaultIcon }) {

	const [iconData, setIconData] = new useState([]);
	const [selectedIcon, setSelectedIcon] = new useState(null);
	const [iconSize, setIconSize] = new useState(defaultIconSize);
	const [filterTag, setFilterTag] = new useState("");


	useEffect(() => {
		setDialogResult({ icon: selectedIcon?.id ?? defaultIcon, iconSize: iconSize })
	},
		[defaultIcon, selectedIcon, iconSize, setDialogResult])

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
				//				console.log(JSON.stringify(myJson));
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

		if (selectedIcon != targetIcon) {
			console.log(targetIcon.id);
			targetIcon.className = "selected";
			setSelectedIcon(targetIcon);
			setDialogResult({ icon: targetIcon.id, iconSize: iconSize });
		}

	}

	function getFilteredIcons(icons) {
		if (filterTag == "") {
			return icons;
		}

		return icons.filter(i => {
			console.log(i);
			return i["Tags"].includes(filterTag);
		})
	}

	return (
		<>
			<form method="dialog" >
				<h1>Select an icon!</h1>
				<div className="flex justify-center mb-3">
					<FilterButton
						defaultState={filterTag == "Creature"}
						icon="./icons/ui/character_icon.png"
						onToggleOn={() => setFilterTag("Creature")}
						onToggleOff={() => setFilterTag("")}
					/>
					<FilterButton
						defaultState={filterTag == "Structure"}
						icon="./icons/ui/location_icon.png"
						onToggleOn={() => setFilterTag("Structure")}
						onToggleOff={() => setFilterTag("")}
					/>
					<FilterButton
						defaultState={filterTag == "Object"}
						icon="./icons/ui/object_icon.png"
						onToggleOn={() => setFilterTag("Object")}
						onToggleOff={() => setFilterTag("")}
					/>
					<FilterButton
						defaultState={filterTag == "Action"}
						icon="./icons/ui/action_icon.png"
						onToggleOn={() => setFilterTag("Action")}
						onToggleOff={() => setFilterTag("")}
					/>
					<FilterButton
						defaultState={filterTag == "Symbol"}
						icon="./icons/ui/symbol_icon.png"
						onToggleOn={() => setFilterTag("Symbol")}
						onToggleOff={() => setFilterTag("")}
					/>
				</div>
				<div className="h-100 overflow-y-scroll" >
					<div className=" columns-5 w-100 ">
						{
							iconData && iconData.length > 0 && getFilteredIcons(iconData).map(
								(icon) => <img className="deselected" id={icon.Name} key={icon.Name} src={"./icons/default/" + icon.Name} height="64" width="64" onClick={iconSelected} />)
						}
					</div>
				</div>
				<p>Icon Size:</p>
				<select value={iconSize} name="mapIconSize" onChange={(e) => {
					setIconSize(e.target.value);
				}}>
					<option value="32">32</option>
					<option value="64">64</option>
					<option value="96">96</option>
				</select>

			</form>
		</>
	)
}

export default IconSelectorPopup;