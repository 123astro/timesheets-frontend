import React from "react";
import BorderCard from '../common/BorderCard'




const Client = (props) => {
  return (

    <BorderCard >
      <h1>{props.client.companyName}</h1>
      <p> &nbsp;&nbsp;Contact:&nbsp;{props.client.contactName}</p>
      <p>&nbsp; Client ID: {props.client.id}</p>
    </BorderCard>

  )
}

export default Client;