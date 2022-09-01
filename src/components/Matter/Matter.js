import React from "react";
import BorderCard from "../common/BorderCard";



const Matter = (props) => {
  return (

    <BorderCard>
      <h1>{props.matter.matterName}</h1>
      <p1>Matter ID: {props.matter.id}</p1> &nbsp;
      <p1>Client: {props.matter.client.companyName}</p1>
    </BorderCard>

  )
}

export default Matter;