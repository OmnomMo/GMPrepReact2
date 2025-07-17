//#region campaigns

async function requestCampaigns({queryKey}) {
	const [_key, userToken] = queryKey;
	const requestParams = {
		method: 'GET',
		header: {'Content-Type': 'application/json'},
	}
	console.log("Fetching campaigns for user " + userToken)
	return fetch('http://localhost:5140/Campaigns/' + userToken, requestParams)
		.then(result => result.json())
}

async function requestCreateNewCampaign({data, userToken}) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}
	console.log("Adding campaign")
	return fetch('http://localhost:5140/Campaigns/Create/' + userToken, requestOptions)
		.then(result => result.json())
		.then(json => {
			console.log(json);
			return json;
		})
}

async function requestDeleteCampaign({campaignId, userToken}) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'},
	}
	console.log("Deleting Campaign")
	return fetch('http://localhost:5140/Campaigns/Delete/' + campaignId + "/" + userToken, requestOptions)
}
//#region Nodes
async function postNode({data, campaignId, userToken}) {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data)
	};
	return fetch('http://localhost:5140/Nodes/Update/' + campaignId + "/" + userToken, requestOptions)
		.then(response => response.json());
}

async function deleteNode({data, userToken}) {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data.data)
	}
	return fetch('http://localhost:5140/Nodes/Delete/' + userToken, requestOptions);
}

//#region Maps
async function requestMaps({ queryKey }) {
	const [_key, campaignId, userToken] = queryKey;
	const requestParams = {
		method: 'GET',
		header: { 'Content-Type': 'application/json' },
	}
	console.log("Fetching maps for campaign " + campaignId)
	return fetch('http://localhost:5140/Campaigns/Maps/' + campaignId + "/" + userToken, requestParams)
		.then(result => result.json())
}

async function requestCreateNewMap({ data, campaignId, userToken }) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}
	console.log("Adding map")
	return fetch('http://localhost:5140/Campaigns/Maps/Create/' + campaignId + "/" + userToken, requestOptions)
		.then(result => result.json())
		.then(json => {
			console.log(json);
			return json;
		})
}

async function requestDeleteMap({ mapId, userToken }) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	}
	console.log("Deleting Campaign")
	return fetch('http://localhost:5140/Campaigns/Maps/Delete/' + mapId + "/" + userToken, requestOptions)
}

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

export {
	getAllMapNodes,
	postMapNode,
	deleteMapNode,
	requestCampaigns,
	requestCreateNewCampaign,
	requestDeleteCampaign,
	postNode,
	deleteNode,
	requestMaps,
	requestCreateNewMap,
	requestDeleteMap
}