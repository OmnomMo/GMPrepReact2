export default function FilterButton({icon, onToggleOn, onToggleOff, defaultState}) {


	return (
		<>
			<label label="FilterButton" className="toggleButton m-2">
							<input
								type="checkbox"
								checked={defaultState}
								onChange={e => {
									if (e.target.checked) {
										onToggleOn();
									} else {
										onToggleOff();
									}
								}}
							/>
							<span className="toggleBG"><img src={icon} className="p-1" /></span>
				</label>
		</>
	)
}