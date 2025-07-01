//#region requests
async function getAllMapNodes({ queryKey }) {

	const [_key, { mapId }] = queryKey
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	}
	console.log("Requesting Map Nodes")
	return fetch(`http://localhost:5140/Nodes/MapNodes/${mapId}`, requestOptions)
		.then(result => {
			return result.json();
		})
		.then(json => {
			console.log(json);
			return json;
		});
}

async function postMapNode({ data, mapId }) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	};
	return fetch(`http://localhost:5140/Nodes/CreateMapNode/${mapId}`, requestOptions)
		.then(response => response.json());
}

async function deleteMapNode({ mapNodeId }) {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json' },
	}
	console.log("deleting map node")
	return fetch(`http://localhost:5140/Nodes/DeleteMapNode/${mapNodeId}`, requestOptions)
		.then(response => {
			return response.json;
		})
		.then(json => {
			console.log("deleted map node")
			console.log(json);
			return json;
		}
	);
}

//#endregion

export {getAllMapNodes, postMapNode, deleteMapNode}