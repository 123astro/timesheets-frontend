import React, { useContext, useState, useEffect } from "react";
import Input from "../common/Input";
import BorderCard from "../common/BorderCard";
import Button2 from "../common/Button2";
import Splash from "../common/Splash";
import timerpic1 from '../../assets/timerpic1.jpg'
import axios from "axios";
import InlineInputContainer from "../common/InlineInputContainer";
import { gapi } from 'gapi-script';
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { AuthContext } from "../Providers/AuthProvider";



const CLIENT_ID = "1014030138797-88ms9kqc0t6jkslmrqa6ffh1b5h1bkga.apps.googleusercontent.com";
const API_KEY = "AIzaSyCX2_pwjiZppDz4rXSiVTSq3-vDCJmeeMA";
const SCOPES = "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/gmail.readonly";
let myWindow;



const Timer = () => {
    //  const login1 = new GoogleLogin();
    const [auth] = useContext(AuthContext)
    const handleChange = (e) => {
        updateForm(e.target.id, e.target.value)

    }

    const [submitting, setSubmitting] = useState(false)

    const updateForm = (field, value) => {
        setQuery({
            ...query,
            [field]: value
        })
    }

    const [query, setQuery] = useState({
        matterId: "",
        actionName: "",
    });

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

    function createEmail() {
        var accessToken = gapi.auth.getToken().access_token;
        fetch('https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest', {
            headers: new Headers({ 'Authorization': 'Bearer ' + accessToken })
        }).then((res) => {
            return res.json();
        }).then(function (val) {
            console.log(val)
            myWindow = window.open('https://mail.google.com/mail/u/0/#compose');
        })
    }

    function captureStartTime() {
        if (query.matterId !== "") {
            startTimer()
            createFile('Action Started')
            getTimeString()
        } else (
            alert("*********Matter ID and Action name are needed.*********")
        )
    }

    function captureStartTimeEmail() {
        if (query.matterId !== "") {
            startTimer()
            createEmail('Email Started')
            getTimeString()
        } else (
            alert("*********Matter ID and Action name are needed.*********")
        )
    }

    function captureStopTime() {
        stopTimer();
        getTimeString();
        myWindow.window.close();
        alert("Logged out of Google and Action closed.")
    }

    function captureStopTimeEmail() {
        stopTimer();
        getTimeString();
        myWindow.window.close();
        alert("Logged out of Google and Action closed.")
    }

    //data base
    const startTimer = async () => {
        console.log("timer started")
        setSubmitting(true);
        const data = query;
        try {
            const res = await axios.post(`http://localhost:8080/api/action/start/${query.matterId}/${query.actionName}`, data)
            setQuery({ matterId: "", actionName: "" })
            alert("Timer started")
            console.log(res.data)
        } catch (error) {
            console.error(error.response ? error.reponse.data : error.message)
        }
    }

    //data base
    const stopTimer = async () => {
        console.log("timer stopped")
        setSubmitting(true);
        const data = query;
        try {
            const res = await axios.post(`http://localhost:8080/api/action/stop`, data)
            setQuery({ matterId: "", actionName: "" })
            alert(res.data + " was successfully added!")
            console.log(res.data)
        } catch (error) {
            console.error(error.response ? error.reponse.data : error.message)
        }
    }

    return (
        <Splash image={timerpic1} >
            <div>
                <div style={{ marginTop: '10em' }}>
                </div>
                <div style={{ marginTop: '20em' }}>
                    <InlineInputContainer style={{
                        height: 100
                    }}>
                        <GoogleLogin>
                        </GoogleLogin>
                        <button onClick={() => captureStartTime()} style={{
                            height: 42,
                            borderColor: "beige",
                            borderColor: "black",
                            borderWidth: 1
                        }}> Start Brief </button>

                        <GoogleLogout>
                            <button style={{
                                height: 18,
                                borderColor: "beige",
                                borderWidth: 1,
                                borderColor: "black",
                            }} onClick={() => captureStopTime()} > End Brief </button>
                        </GoogleLogout>
                        <div>
                            <Input
                                matterId="matterId"
                                id="matterId"
                                placeholder="Matter ID"
                                value={query.matterId}
                                onChange={handleChange}
                            />
                            <Input
                                actionName="actionName"
                                id="actionName"
                                placeholder="Action Name"
                                value={query.actionName}
                                onChange={handleChange}
                            />
                        </div>
                    </InlineInputContainer>
                    <BorderCard style={{
                        border: "blue",
                        borderRadius: 5,
                        margin: '100px',
                        padding: '10px',
                        width: "40%",
                        maxWidth: 1000,
                        backgroundColor: "rgba(52, 52, 52, 0.8)",
                        boxShadow: '1px 1px 20px rgba(91, 91, 91, 0.5)'
                    }}>
                        <button onClick={() => captureStartTimeEmail()} style={{
                            height: 42,
                            borderColor: "beige",
                            borderColor: "black",
                            borderWidth: 1,
                            margin: 50,
                        }}> Start Email </button>
                        <button style={{
                            //display: "flex",
                            height: 42,
                            borderColor: "beige",
                            borderWidth: 1,
                            borderColor: "black",
                            margin: 50,

                        }} onClick={() => captureStopTimeEmail()} > Close Email </button>
                    </BorderCard>
                </div>
            </div>
        </Splash>
    )
}

export default Timer;
