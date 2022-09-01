import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";
import Container from "../common/Container";
import Bill from "./Bill";
import money from '../../assets/money2.jpg';



const Billables = () => {
    const [billables, setBillables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth] = useContext(AuthContext)


    useEffect(() => {
        const getBillables = async () => {
            try {
                const actionRes = await axios.get(`http://localhost:8080/api/action/attorney/${auth.id}`)         
                console.log(actionRes.data)
                setBillables(actionRes.data)
            } catch (error) {
                console.error(error.response ? error.resonse.data : error.message)
            }
            setLoading(false)
        }
        getBillables();
    }, [loading])


    const displayBills = () => {
        return billables.map(bill => {
            return (<Bill bill={bill} />)
        })
    }

    const styles = {
        parallax: {
            /* The image used */
            backgroundImage: `url(${money})`,

            /* Set a specific height */
            minHeight: '100px',
            // maxWidth: '100px',

            /* Create the parallax scrolling effect */
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },
    }

    return (
        <Container style={styles.parallax}>
            <h1 style={{
                fontSize: "10rem", color: ""
            }}>Billables</h1>
            {loading ? (<p>Loading...</p>) : (
                displayBills()
            )}
        </Container >
    )
}

export default Billables;