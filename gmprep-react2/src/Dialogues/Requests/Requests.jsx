//#region campaigns

let IP = "http://localhost"
let PORT = ":5140"


//TODO: better handling of paths when deployed
if (!window.location.href.includes("localhost")) {
	IP = "https://gmprep-server.fly.dev"
	PORT = ""
}

async function requestCampaigns({ queryKey }) {
	const [_key, userToken] = queryKey;
	const requestParams = {
		method: 'GET',
		header: { 'Content-Type': 'application/json' },
	}
	console.log("Fetching campaigns for user " + userToken)
	console.log(`${IP}${PORT}/Campaigns/${userToken}`)
	return fetch(`${IP}${PORT}/Campaigns/${userToken}`, requestParams)
		.then(result => result.json())
}

async function requestCreateNewCampaign({ data, userToken }) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}
	console.log("Adding campaign")
	return fetch(`${IP}${PORT}/Campaigns/Create/${userToken}`, requestOptions)
		.then(result => result.json())
		.then(json => {
			console.log(json);
			return json;
		})
}

async function requestDeleteCampaign({ campaignId, userToken }) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	}
	console.log("Deleting Campaign")
	return fetch(`${IP}${PORT}/Campaigns/Delete/${campaignId}/${userToken}`, requestOptions)
}
//#region Nodes
async function postNode({ data, campaignId, userToken }) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	};
	return fetch(`${IP}${PORT}/Nodes/Update/${campaignId}/${userToken}`, requestOptions)
		.then(response => response.json());
}

async function deleteNode({ data, userToken }) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data.data)
	}
	return fetch(`${IP}${PORT}/Nodes/Delete/${userToken}`, requestOptions);
}

async function getAllNodes({ queryKey }) {
	const [_key, campaignId, userToken] = queryKey;

	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	}
	console.log("Requesting Nodes")
	return fetch(`${IP}${PORT}/Nodes/All/${campaignId}/${userToken}`, requestOptions)
		.then(result => result.json())
		.then(json => {
			console.log(json);
			return json;
		});
}
//#region Maps
async function requestMaps({ queryKey }) {
	const [_key, campaignId, userToken] = queryKey;
	const requestParams = {
		method: 'GET',
		header: { 'Content-Type': 'application/json' },
	}
	console.log("Fetching maps for campaign " + campaignId)
	return fetch(`${IP}${PORT}/Campaigns/Maps/${campaignId}/${userToken}`, requestParams)
		.then(result => result.json())
}

async function requestCreateNewMap({ data, campaignId, userToken }) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}
	console.log("Adding map")
	return fetch(`${IP}${PORT}/Campaigns/Maps/Create/${campaignId}/${userToken}`, requestOptions)
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
	return fetch(`${IP}${PORT}/Campaigns/Maps/Delete/${mapId}/${userToken}`, requestOptions)
}

async function getAllMapNodes({ queryKey }) {

	const [_key, { mapId, userToken }] = queryKey
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	}
	console.log("Requesting Map Nodes")
	return fetch(`${IP}${PORT}/Nodes/MapNodes/${mapId}/${userToken}`, requestOptions)
		.then(result => {
			return result.json();
		})
		.then(json => {
			console.log(json);
			return json;
		});
}

async function postMapNode({ data, mapId, userToken }) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	};
	return fetch(`${IP}${PORT}/Nodes/CreateMapNode/${mapId}/${userToken}`, requestOptions)
		.then(response => response.json());
}

async function deleteMapNode({ mapNodeId, userToken }) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	}
	console.log("deleting map node")
	return fetch(`${IP}${PORT}/Nodes/DeleteMapNode/${mapNodeId}/${userToken}`, requestOptions)
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
	getAllNodes,
	requestMaps,
	requestCreateNewMap,
	requestDeleteMap
}