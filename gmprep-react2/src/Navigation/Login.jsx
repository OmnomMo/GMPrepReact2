import UserButton from "../Dialogues/UserSelection/UserButton";
import { useContext } from "react";
import { GlobalContext } from "../Contexts";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'



//Page is shown when there is no user data available

export default function Login() {
	const { setUserData, setUserToken } = useContext(GlobalContext);





	return (
		<div id="loginBackground" className="loginBackground size-full flex flex-col justify-center">
			<div className="loginPanel self-center">
				<h1>LOGIN</h1>
				<div className="self-center">

					<GoogleLogin
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
				</div>
			</div>

		</div>
	)
}