import React, { useEffect, useContext } from "react";
import Input from "../common/Input";
import InlineInputContainer from "../common/InlineInputContainer";
import { gapi } from 'gapi-script';
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { AuthContext } from "../Providers/AuthProvider";



const CLIENT_ID = "1014030138797-88ms9kqc0t6jkslmrqa6ffh1b5h1bkga.apps.googleusercontent.com";
const API_KEY = "AIzaSyCX2_pwjiZppDz4rXSiVTSq3-vDCJmeeMA";
const SCOPES = "https://www.googleapis.com/auth/drive";
let myWindow;


const TimerForm = (props) => {
    const [auth] = useContext(AuthContext)
    const handleChange = (e) => {
        props.updateForm(e.target.id, e.target.value)

    }

    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                scope: SCOPES

            })
        }
        gapi.load('client:auth2', start)
    })

    function zerofill(i) {
        return (i < 10 ? '0' : '') + i; //10
    }

    function getDateString() {
        const date = new Date();
        const year = date.getFullYear();
        const month = zerofill(date.getMonth() + 1);
        const day = zerofill(date.getDate());
        return year + '-' + month + '-' + day;
    }

    function getTimeString() {
        const time = new Date();
        var options = { hour: 'numeric', minute: '2-digit', second: '2-digit' }
        console.log(time.toLocaleTimeString('en-US', options))
        return time.toLocaleTimeString('en-US', options);

    }


    function createFile(tag) {
        var accessToken = gapi.auth.getToken().access_token;
        var fileName = tag + " " + auth.name + " " + getDateString() + " " + getTimeString();
        fetch('https://docs.googleapis.com/v1/documents?title=' + fileName, {
            method: "POST",
            headers: new Headers({ 'Authorization': 'Bearer ' + accessToken })
        }).then((res) => {
            return res.json();
        }).then(function (val) {
            console.log(val);
            console.log(val.documentId)
            myWindow = window.open('https://docs.google.com/document/d/' + val.documentId + "/edit", "_blank");
        })


    }
    function captureStartTime() {
        createFile('Start Brief')
        console.log("This start worked")
        getTimeString()
    }

    function captureStopTime() {
        getTimeString();
        console.log("This stop worked")
        myWindow.close()
    }

    return (
        <div>
            <div onSubmit={props.onSubmit} style={{ marginTop: '20em' }}>
                <InlineInputContainer>
                    <Input
                        matterId="matterId"
                        id="matterId"
                        placeholder="Matter ID"
                        value={props.query.matterId}
                        onChange={handleChange}
                    />
                    <Input
                        actionName="actionName"
                        id="actionName"
                        placeholder="Action Name"
                        value={props.query.actionName}
                        onChange={handleChange}
                    />
                </InlineInputContainer>
            </div>
            <div style={{ marginTop: '20em' }}>
                <InlineInputContainer>
                    <GoogleLogin> <button onClick={() => captureStartTime()} style={{
                        height: 41,
                        borderColor: "beige",
                        borderWidth: 5
                    }}> Start Brief </button>
                    </GoogleLogin>
                    <GoogleLogout>
                        <button style={{
                            height: 41,
                            borderColor: "beige",
                            borderWidth: 5
                        }} onClick={() => captureStopTime()} > End Brief </button>
                    </GoogleLogout>
                </InlineInputContainer>
            </div>
        </div>
    )
}


export default TimerForm;