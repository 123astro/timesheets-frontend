import React from "react";
import Container from "../common/Container";
import Splash from '../common/Splash'
import homesplash from '../../assets/homesplash.jpg'


const Home = () => {
  return (
    <Container>
      <Splash image={homesplash} style={{ color: "#869EA3" }}>
        <h1 style={{ textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000', fontSize: "120px" }}  >Time Management </h1>
      </Splash>
    </Container>
  )
}

export default Home;