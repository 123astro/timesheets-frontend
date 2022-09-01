import React, { Fragment, useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";
import Container from "../common/Container";
import Matter from "./Matter";
import books from "../../assets/books.jpg"
import { useNavigate } from "react-router-dom";
import { CgAddR } from "react-icons/cg"



const Matters = () => {
    const [matters, setMatters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth] = useContext(AuthContext)

    useEffect(() => {
        const getMatters = async () => {
            try {
                const matterRes = await axios.get(`http://localhost:8080/api/matter/attorney/${auth.id}`)

                console.log(matterRes.data)

                setMatters(matterRes.data)
            } catch (error) {
                console.error(error.response ? error.resonse.data : error.message)
            }
            setLoading(false)
        }
        getMatters();
    }, [loading])

    const displayMatters = () => {
        return matters.map(matter => {
            return (<Matter matter={matter} />)
        })
    }

    const styles = {
        parallax: {
            /* The image used */
            backgroundImage: `url(${books})`,

            /* Set a specific height */
            minHeight: '100px',

            /* Create the parallax scrolling effect */
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },
    }

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/AddMatter'), [navigate])

    return (

        <Container style={styles.parallax}>
            <Container style={styles.parallax} class="font-icon-wrapper" >
                <h1 style={{ color: 'black', fontSize: "10rem" }} >Matters</h1>
                <CgAddR style={{
                    position: 'absolute',
                    top: '245px',
                    right: '200px',
                }} onClick={handleOnClick} size="7em" onMouseOver={({ target }) => target.style.color = 'lightblue'}
                    onMouseOut={({ target }) => target.style.color = 'black'}>  Add Matter </CgAddR>
                {loading ? (<p>Loading...</p>) : (
                    displayMatters()
                )}
            </Container>
        </Container >
    )
}

export default Matters;