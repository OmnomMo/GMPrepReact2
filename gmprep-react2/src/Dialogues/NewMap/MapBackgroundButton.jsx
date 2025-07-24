import './MapBackgroundButton.css';

export default function MapBackgroundButton({src, onSelected, isSelected}) {

	
	const className = isSelected ? "mapBackgroundButton selected" : "mapBackgroundButton"

	return (
		<div className={className} onClick={() => {onSelected(src);}}>
			<img className="w-full h-full object-cover" src={"./maps/" + src}></img>
		</div>
	)
}