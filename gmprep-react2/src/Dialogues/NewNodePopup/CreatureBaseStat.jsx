import { useEffect, useState } from "react";
import { GetAbilityModifier, GetModifierColor} from "../../Globals/Skills";

export default function CreatureBaseStat({ defaultValue, label, editeable, doneEditing, onChange, showModifier = false}) {
	const [currentValue, setCurrentValue] = useState(defaultValue);

	useEffect(() => {
		onChange(label, currentValue);
	}, [onChange, label, currentValue])

	let modifier = GetAbilityModifier(currentValue);

	if (editeable) {
		return (
			<>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<p className="text-bold w-12 text-left">{label}: </p>
					<input
						type="text"
						inputMode="numeric"
						maxLength={3}
						className="w-10 text-center"
						defaultValue={currentValue}
						onChange={e => setCurrentValue(e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								doneEditing();
							}
						}}
					/>
				</div>
			</>
		)
	} else {
		return (
			<div style={{ display: "flex", flexDirection: "row" }}>
				<p className="text-bold w-12 text-left">{label}: </p>
				<p className="w-4">{currentValue}</p>
				{showModifier && 
					<p className="ml-2" style={{color:GetModifierColor(modifier)}}>
						{new Intl.NumberFormat("en-IN", {style:"decimal", signDisplay:"always"}).format(modifier)}
					</p>
				}
			</div>
		)
	}
}