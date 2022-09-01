import React, { useContext, useState } from "react";
import Container from "../common/Container";
import { AuthContext } from "../Providers/AuthProvider";
import AddMatterForm from "./AddMatterForm";
import axios from "axios"
import Splash from "../common/Splash";


const AddMatter = () => {

    const [query, setQuery] = useState({
        matterName: "",
        clientId: ""
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
            const res = await axios.post(`http://localhost:8080/api/matter/client/${query.clientId}/addMatter`, data
            )
            alert(res.data.matterName + " was successfully added!")
            setQuery({ matterName: "", clientId: "" })
            setSubmitting(false)
        } catch (error) {
            console.error(error.response ? error.reponse.data : error.message)
        }
    }

    return (

        <Container>
            <h1>Add Matter</h1>
            <AddMatterForm query={query} updateForm={updateForm} onSubmit={onSubmit} submitting={submitting}></AddMatterForm>
        </Container>

    )
}


export default AddMatter;