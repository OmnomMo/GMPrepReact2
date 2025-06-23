import { useState } from "react"
import Secret from "./Secret";

export default function SecretsFormComponent() {

	//https://react.dev/learn/updating-arrays-in-state

	const [secrets, setSecrets] = useState([]);
	const [maxId, setMaxId] = useState(0);

	function addSecret() {
		setSecrets([...secrets, {id: maxId, skill:"None", difficulty:"10", description:"Description"}])
		setMaxId((prev) => prev +1);
	}

	function deleteSecret(id) {
		let newSecrets = secrets.filter(function(e) {return e.id !== id});
		setSecrets(newSecrets);
	}

	function updateSecret(id, content) {
		setSecrets(secrets.map(secret => {
			if (secret.id ===id) {
				return content;
			} else {
				return secret;
			}
		}))
	}


	return <div>
		<div style={{display: "flex", flexDirection:"row"}} className="pt-2">
			<h4 className=" text-left flex-initial ">Secrets</h4>
			<img src="/icons/ui/add_icon.png" className="self-center" onClick={addSecret}/>
		</div>
		<ul>
			{secrets.map(secret => 
			<li className="w-full mt-2 p-2 bg-gray-100/5" key={secret.id}>
				<Secret defaultContent={secret} onDelete={deleteSecret} onUpdate={updateSecret}/>
			</li>)}
		</ul>
	</div>
}