import React, { useState } from "react";
//Dynamic list of generic elements (provided as children)
//Children must implement defaultContent (generic object of default data), and must call functions called onUpdate and onDelete that are
//passed to them as props
export default function EditeableList ({children, defaultElement, header}) {

	const [elements, setElements] = useState([]);
	const [maxId, setMaxId] = useState(0);

	function addElement() {
		//clone default element
		let newElement = {...defaultElement};
		newElement.id = maxId;
		//add new element to list
		setElements([...elements, newElement])
		//increment max id
		setMaxId((prev) => prev + 1);
	}

	function deleteElement(id) {
		let updatedElements = elements.filter(function(e) {return e.id !== id});
		setElements(updatedElements);
	}

	function updateElement(id, content) {
		setElements(elements.map(element => {
			if (element.id ===id) {
				return content;
			} else {
				return element;
			}
		}))
	}


	return <div>
		<div style={{display: "flex", flexDirection:"row"}} className="pt-2">
			<h4 className=" text-left flex-initial ">{header}</h4>
			<img src="/icons/ui/add_icon.png" className="self-end pb-1" onClick={addElement}/>
		</div>
		<ul>
			{elements.map(element => 
			<li className="w-full" key={element.id}>
				{React.cloneElement(children, {defaultContent:element, onDelete:deleteElement, onUpdate:updateElement})}
			</li>)}
		</ul>
	</div>
}