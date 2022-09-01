import React from "react";
import BorderCard from '../common/BorderCard'
import Splash from "../common/Splash";
import money from '../../assets/money2.jpg'

const Bill = (props) => {
    return (

        <BorderCard style={{
            backgroundColor: "#869EA3  "
        }}>
            <h1>{props.bill.time} min</h1>
            <p> {props.bill.actionName} &nbsp; </p>
            <p> | {props.bill.matter.matterName} &nbsp; </p>
            <p> | Matter ID : {props.bill.matter.id} &nbsp; </p>
            <p> {props.bill.matter.client.companyName} &nbsp; </p>
        </BorderCard>

    )
}

export default Bill;