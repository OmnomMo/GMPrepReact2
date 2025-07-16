import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserButton from "../Dialogues/UserSelection/UserButton";
import { useContext } from "react";
import { GlobalContext } from "../Contexts";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

async function requestAllUsers() {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	}

	return fetch('http://localhost:5140/Users', requestOptions)
		.then(result => result.json())
		.then(json => {
			console.log(json);
			return json;
		});
}

async function requestCreateUser(data) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}
	return fetch("http://localhost:5140/Users/Create", requestOptions)
		.then(result => result.json())
		.then(json => {
			console.log(json);
			return json;
		})
}

async function requestDeleteUser(id) {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	}
	return fetch("http://localhost:5140/Users/Delete/" + id, requestOptions)
		.then(result => result)
}



export default function Login() {

	const queryClient = useQueryClient();

	const { setUserData, setUserToken} = useContext(GlobalContext);

	/*
	const { status, error, data: users } = useQuery(
		{
			queryKey: ['AllUsers'],
			queryFn: requestAllUsers,
		}
	)
*/

	const createUserMutation = useMutation({
		mutationFn: requestCreateUser,
	})

	const deleteUserMutation = useMutation({
		mutationFn: requestDeleteUser,
	})

	function onUserSelected(userId, userName) {
		setUserData({ name: userName, id: userId });
	}

	function createNewUser(userName) {
		createUserMutation.mutate({
			name: userName
		}, {
			onSuccess: (data) => {
				console.log(data);
				queryClient.invalidateQueries({ queryKey: ['AllUsers'] });
			}
		})
	}

	function deleteUser(userId) {
		let confirm = window.confirm("Do you really want to delete this user?\nThis will delete all campaigns and nodes related to this user as well and cannot be undone.")
		if (confirm) {
			deleteUserMutation.mutate(
				userId,
				{
					onSuccess: (data) => {
						console.log("user successfully deleted")
						console.log(data);
						queryClient.invalidateQueries({ queryKey: ['AllUsers'] });
					}
				});
		}
	}
/*
	if (status == 'pending') {
		return <div>LOADING USERS...</div>
	}

	if (status == 'error') {
		return <div>ERROR LOADING USERS ({error})</div>
	}
*/

	return (
		<>
			<h1>LOGIN</h1>
			<GoogleLogin
				className="m-5"
				onSuccess={credentialResponse => {
					console.log(credentialResponse);
					let credential = jwtDecode(credentialResponse.credential);
					console.log(credential)
					setUserData(credential)
					setUserToken(credentialResponse.credential)
					
				}}
				onError={error => {
					console.log("login failed! " + error);
				}}
			/>
{/*}			<ul className="bg-gray-900 p-4 h-100">
				{users.map(user =>
					<UserButton
						key={"UserButton" + user.id}
						userName={user.name}
						userId={user.id}
						onSelected={onUserSelected}
						onDeleted={deleteUser}
					/>
				)}
			</ul>
			<button className="m-4" onClick={() => {
				let newUserName = prompt("New user name:");
				if (newUserName != null && newUserName != "") {
					createNewUser(newUserName);
				}
			}}>New User</button>*/}
		</>
	)
}