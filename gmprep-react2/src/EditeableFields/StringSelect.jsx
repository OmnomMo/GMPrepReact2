import { useState } from "react"


export default function StringSelect({options, defaultValue, onUpdate}) {

	const [currentValue, setCurrentValue] = useState(defaultValue);

	return (
		<select value={currentValue} onChange={e => {
			setCurrentValue(e.target.value);
			onUpdate(e.target.value);
			}}>
			{options.map(currentOption => 
				<option
					key={currentOption}
					value={currentOption}>{currentOption}</option>)
			}
		</select>
	)
}