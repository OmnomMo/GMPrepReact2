import { useState } from "react"
import { CONDITIONS } from "../../Globals/Conditions";
import { DAMAGE_TYPES } from "../../Globals/DamageTypes";

export default function ImmunitiesResistances({editing}) {

	const [conditionImmunities, setConditionImmunities] = useState([]);
	const [damageResistances, setDamageResistances] = useState([]);
	const [damageImmunities, setDamageImmunities] = useState([]);

	function toggleDamageResistance(name, add) {
		if (add) {
			if (!damageResistances.includes(name)) {
				setDamageResistances([...damageResistances, name]);
			}
		} else {
			if (damageResistances.includes(name)) {
				let updatedResistances = damageResistances.filter(function(e) {return e !== name});
				setDamageResistances(updatedResistances);
			}
		}
	}
	function toggleDamageImmunity(name, add) {
		if (add) {
			if (!damageImmunities.includes(name)) {
				setDamageImmunities([...damageImmunities, name]);
			}
		} else {
			if (damageImmunities.includes(name)) {
				let updatedImmunities = damageImmunities.filter(function(e) {return e !== name});
				setDamageImmunities(updatedImmunities);
			}
		}
	}
	
	function toggleConditionImmunity(name, add) {
		if (add) {
			if (!conditionImmunities.includes(name)) {
				setConditionImmunities([...conditionImmunities, name]);
			}
		} else {
			if (conditionImmunities.includes(name)) {
				let updatedImmunities = conditionImmunities.filter(function(e) {return e !== name});
				setConditionImmunities(updatedImmunities);
			}
		}
	}
	if (editing) {
		return (
			<div className="w-full">
				<p>Damage Resistances:</p>
				<div name="damageResistances" className="toggleArea">
					{DAMAGE_TYPES.map(damageType => {
						return(
						<label className="toggleButton">
							<input
								type="checkbox"
								name={damageType}
								checked={damageResistances.includes(damageType)}
								onChange={e => toggleDamageResistance(e.target.name, e.target.checked)}
							/>
							<span className="toggleBG">{damageType}</span>
						</label>
						);
					})}
				</div>
				<p>Damage Immunities:</p>
				<div name="damageImmunities" className="toggleArea">
					{DAMAGE_TYPES.map(damageType => {
						return(
						<label className="toggleButton">
							<input
								type="checkbox"
								name={damageType}
								checked={damageImmunities.includes(damageType)}
								onChange={e => toggleDamageImmunity(e.target.name, e.target.checked)}
							/>
							<span className="toggleBG">{damageType}</span>
						</label>
						);
					})}
				</div>
				<p>Condition Immunities:</p>
				<div name="conditionImmunities" className="toggleArea">
					{CONDITIONS.map(condition => {
						return(
						<label className="toggleButton">
							<input
								type="checkbox"
								name={condition}
								checked={conditionImmunities.includes(condition)}
								onChange={e => toggleConditionImmunity(e.target.name, e.target.checked)}
							/>
							<span className="toggleBG">{condition}</span>
						</label>
						);
					})}
				</div>
			</div>
		)
	} else {
		return (
			<div className="flexColumn">
				{damageResistances.length > 0 && <p className="text-left"><b>Damage Resistances:</b> {damageResistances.join(", ")}</p>}
				{damageImmunities.length > 0 && <p className="text-left"><b>Damage Immunities:</b> {damageImmunities.join(", ")}</p>}
				{conditionImmunities.length > 0 && <p className="text-left"><b>Condition Immunities:</b> {conditionImmunities.join(", ")}</p>}
			</div>
		)
	}
}