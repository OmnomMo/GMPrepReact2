import { useEffect, useState } from "react";
import SIZES from "../../Globals/Sizes.jsx";
import ALIGNMENTS from "../../Globals/Alignments.jsx";
import CREATURE_TYPES from "../../Globals/CreatureTypes.jsx";



export default function TypeAlignmentComponent({defaultSize, defaultType, defaultAlignment, onChange}) {
	const [editing, setEditing] = useState(false);
	const [valueType, setValueType] = useState(defaultType);
	const [valueSize, setValueSize] = useState(defaultSize);
	const [valueAlignment, setValueAlignment] = useState(defaultAlignment);


	useEffect(() => onChange({type:valueType, size:valueSize, alignment:valueAlignment}), [onChange, valueType, valueSize, valueAlignment]);


	if (!editing) {
		return (
			<div style={{display:"flex", flexDirection:"row"}}>
				<p className="italic w-full">{valueSize} {valueType}, {valueAlignment}</p>
				<img src="./icons/ui/wrench_icon.png" onClick={() => setEditing(true)}/>
			</div>
		)
	} else {
		return (
			<>
			<div style={{display:"flex", flexDirection:"row"}}>
				<select
					value={valueSize}
					onChange={e => {
						setValueSize(e.target.value);
					}}
				>
					{SIZES.map(size => <option key ={size} value={size}>{size}</option>)}
				</select>
				<select
					value={valueType}
					onChange={e => {
						setValueType(e.target.value);
					}}
				>
					{CREATURE_TYPES.map(type => <option key ={type} value={type}>{type}</option>)}
				</select>
				<select
					value={valueAlignment}
					onChange={e => {
						setValueAlignment(e.target.value);
					}}
				>
					{ALIGNMENTS.map(alignment => <option key ={alignment} value={alignment}>{alignment}</option>)}
				</select>
				<img src="./icons/ui/check_icon.png" onClick={() => setEditing(false)}/>
			</div>
			</>
		)
	}
}