import { useEffect, useState } from "react";

export default function EditeableNumericicon({ defaultValue, iconSource, onUpdate, onChange, showEditIcon, editeableOverride = false }) {
	const [editing, setEditing] = useState(editeableOverride)
	const [value, setValue] = useState(defaultValue)

	useEffect(() => {
		onChange(value);
	}, [onChange, value])

	if (!editing && !editeableOverride) {
		return (
			<>
				{value != "0" &&
					<div style={{ display: "flex", flexDirection: "row" }} className="w-full">
						<img src={iconSource} />
						<p className=" w-10 text-center">{value}</p>
						{showEditIcon && <img src="/icons/ui/wrench_icon.png" onClick={() => setEditing(true)} />}
					</div>
				}
			</>
		)
	} else {
		return (
			<div style={{display:"flex", flexDirection:"row"}} className="w-full">
				<img src={iconSource} />
				<input
					type="text"
					defaultValue={value}
					inputMode="numerical"
					maxLength={3}
					className="w-10 ml-4"
					onChange={e => setValue(e.target.value)}
					onKeyUp={e => {
						if (e.key === 'Enter') {
							onUpdate(value);
						}
					}}/>
				{showEditIcon && <img src="/icons/ui/check_icon.png" onClick={() => setEditing(false)} />}
			</div>
		)
	}
}