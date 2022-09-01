import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";
import Container from "../common/Container";
import Client from "./Client";
import people2 from "../../assets/people2.jpg"
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { CgAddR } from "react-icons/cg"






const Clients = () => {

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth] = useContext(AuthContext)

    useEffect(() => {
        const getClients = async () => {
            try {
                const clientRes = await axios.get(`http://localhost:8080/api/client/attorney/${auth.id}`)

                console.log(clientRes.data)

                setClients(clientRes.data)
            } catch (error) {
                console.error(error.response ? error.resonse.data : error.message)
            }
            setLoading(false)
        }
        getClients();
    }, [loading])

    const displayClients = () => {
        return clients.map(client => {
            return (<Client client={client} />)
        })
    }

    const styles = {
        parallax: {
            /* The image used */
            backgroundImage: `url(${people2})`,

            /* Set a specific height */
            minHeight: '100px',
            // maxWidth: '100px',

            /* Create the parallax scrolling effect */
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },
        Text: {
            height: '600px',
            padding: '50px',
        }
       

    }

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/AddClient'), [navigate])



    return (


        <Container style={styles.parallax} class="font-icon-wrapper"
         > 
            <h1 style={{ color: 'Orange', fontSize: "10rem" }} >Clients</h1>
            <CgAddR style={{
            position: 'absolute',
            top: '245px',
            right: '200px',
        }} onClick={handleOnClick} size="7em" color="orange" onMouseOver={({ target }) => target.style.color = 'lightblue'}
            onMouseOut={({ target }) => target.style.color = 'orange'}>  Add Client </CgAddR>
            {loading ? (<p>Loading...</p>) : (
                displayClients()
            )}
        </Container>



    )
}

export default Clients;