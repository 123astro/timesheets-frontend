import React from "react";
import GoogleLogoutProps  from "react-google-login";


const clientId = "1014030138797-88ms9kqc0t6jkslmrqa6ffh1b5h1bkga.apps.googleusercontent.com";

function Glogout() {

    const onSuccess = () => { 
        alert("Logged out Successfully")
        console.log("Log out successfull!")
    }

    return (
        <div id="signOutButton">
            <GoogleLogoutProps
                clientId={clientId}
                render={renderProps => (
                    <button onClick={renderProps.onClick}>This is my custom Google button</button>
                  )}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Glogout;