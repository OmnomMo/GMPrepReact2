//#region requests
async function getAllMapNodes({ queryKey }) {

	const [_key, { mapId, userToken}] = queryKey
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	}
	console.log("Requesting Map Nodes")
	return fetch(`http://localhost:5140/Nodes/MapNodes/${mapId}/${userToken}`, requestOptions)
		.then(result => {
			return result.json();
		})
		.then(json => {
			console.log(json);
			return json;
		});
}

async function postMapNode({ data, mapId , userToken}) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	};
	return fetch(`http://localhost:5140/Nodes/CreateMapNode/${mapId}/${userToken}`, requestOptions)
		.then(response => response.json());
}

async function deleteMapNode({ mapNodeId, userToken}) {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json' },
	}
	console.log("deleting map node")
	return fetch(`http://localhost:5140/Nodes/DeleteMapNode/${mapNodeId}/${userToken}`, requestOptions)
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