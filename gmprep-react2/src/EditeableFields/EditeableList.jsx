import React, { useEffect, useState } from "react";
//Dynamic list of generic elements (provided as children)
//Children must implement defaultContent (generic object of default data), and must call functions called onUpdate and onDelete that are
//passed to them as props
export default function EditeableList ({children, defaultData, defaultElement, header, onChange}) {

	const [elements, setElements] = useState(defaultData);
	const [maxId, setMaxId] = useState(0);


	useEffect(() => {
		onDataChanged();
	}, [elements])

	//send elements as list
	function onDataChanged() {

		let keys = Object.keys(elements);
		let elementsArray = keys.map(key => elements[key]);

		onChange(elementsArray)
	}


	function addElement() {
		//clone default element
		let newElement = {...defaultElement};
		newElement['id'] = maxId;
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
		let newElements = elements.map(element => {
			if (element.id ===id) {
				content.id = id;
				return content;
			} else {
				return element;
			}
		})
		setElements(newElements)
	}


	return <div>
		<div style={{display: "flex", flexDirection:"row"}} className="pt-2">
			<h4 className=" text-left flex-initial ">{header}</h4>
			<img src="./icons/ui/add_icon.png" className="self-end pb-1" onClick={addElement}/>
		</div>
		<ul>
			{elements.map(element => 
			<li className="w-full" key={header + element.id} name={header + element.id}>
				{React.cloneElement(children, {
					defaultContent:element,
					onDelete:deleteElement,
					onChange:updateElement,
				})}
			</li>)}
		</ul>
	</div>
}