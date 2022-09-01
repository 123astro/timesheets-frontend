import React from "react";
import GoogleLoginProps from "react-google-login";
import GoogleButton from 'react-google-button'
import FontAwesome from "font-awesome"



const clientId = "1014030138797-88ms9kqc0t6jkslmrqa6ffh1b5h1bkga.apps.googleusercontent.com";

function Glogin() {

    const test = () => {
        console.log("test")
    }

    const onSuccess = (res) => {
        //alert("Logged in Successfully")
        console.log("Login Success! Current user: ", res);

    }

    const onFailure = (res) => {
        console.log("Login Failed! respone: ", res);
    }

    return (
        <div id="signinButton">
            <GoogleLoginProps
                clientId={clientId}
                buttonText= "Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_orgin'}

              />
           
        </div>
    )

}

export default Glogin;