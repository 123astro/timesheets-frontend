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
const SCOPES = "https://www.googleapis.com/auth/drive";
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
    function captureStartTime() {
        if(query.matterId !== ""){
        startTimer()
        // login1.signIn()
        createFile('Start Brief')
        console.log("This start worked")
        getTimeString()
        }
    }

    function captureStopTime() {
        stopTimer();
        getTimeString();
        myWindow.close();

    }



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



    const stopTimer = async () => {

        console.log("timer stopped")
        setSubmitting(true);
        const data = query;
        try {
            const res = await axios.post(`http://localhost:8080/api/action/stop`, data)
            setQuery({ matterId: "", actionName: "" })
            //alert(res.data + " was successfully added!")
            console.log(res.data)
        } catch (error) {
            console.error(error.response ? error.reponse.data : error.message)
        }
    }

    return (
        <Splash image={timerpic1} >
            <div style={{ marginTop: '10em' }}>
                <BorderCard style={{
                    backgroundColor: "black",
                    height: 1
                }} >
                    <Button2 style={{
                        backgroundColor: "beige",
                    }} onClick={startTimer}>
                        Start Timer
                    </Button2>
                    <Button2 style={{
                        backgroundColor: "beige"
                    }}
                        onClick={stopTimer}>
                        Stop Timer
                    </Button2>
                </BorderCard>
                <div style={{ marginTop: '20em' }}>
                    <InlineInputContainer style={{
                        height: 100
                    }}>
                        <GoogleLogin> <button onClick={() => captureStartTime()} style={{
                            height: 25,
                            borderColor: "beige",
                            borderWidth: 5
                        }}> Start Brief </button>
                        </GoogleLogin>
                        <GoogleLogout>
                            <button style={{
                                height: 25,
                                borderColor: "beige",
                                borderWidth: 5
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
                </div>
            </div>
        </Splash>
    )
}

export default Timer;
