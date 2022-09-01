import React, { useContext, useState } from "react";
import Container from "../common/Container";
import { AuthContext } from "../Providers/AuthProvider";
import AddCLientForm from "./AddClientForm";
import axios from "axios"
import Splash from "../common/Splash";
import people from "../../assets/people2.jpg"


const AddClient = () => {

    const [query, setQuery] = useState({
        companyName: ""
    });

    const [submitting, setSubmitting] = useState(false)
    const [auth] = useContext(AuthContext)


    const updateForm = (field, value) => {
        setQuery({
            ...query,
            [field]: value
        })
    }

    const onSubmit = async () => {
        setSubmitting(true);
        const data = query;
        try {
            const res = await axios.post(`http://localhost:8080/api/client/${auth.id}/addClient`, data
            )

           alert(res.data.companyName + " was successfully added!")
           setQuery({companyName:"", contactName:"", phoneNumber:""} )
        
           setSubmitting(false)
        } catch (error) {
            console.error(error.response ? error.reponse.data : error.message)
        }
    }

    return (
     
        <div >
           <h1>AddClient</h1>
            <AddCLientForm query={query} updateForm={updateForm} onSubmit={onSubmit} submitting={submitting}></AddCLientForm>  
        </div>
    )
}


export default AddClient;