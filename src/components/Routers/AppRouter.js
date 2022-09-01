import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../Home/Home";
import Container from "../common/Container";
import Login from "../Auth/Login";
import Attorney from "../Attorney/Attorney"
import Matter from "../Matter/Matters";
import Clients from '../Client/Clients'
import Navbar from "../NavBar/Navbar";
import Billables from "../Billables/Billables";
import AddClient from "../Client/AddClient";
import AddMatter from "../Matter/AddMatter";
import Timer from "../Action/Timer";


const AppRouter = () => {
    return (
        <Container>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Attorney" element={<Attorney />} />
                <Route path="Billables" element={<Billables />} />
                <Route path="Clients" element={<Clients />} />
                <Route path="AddMatter" element={<AddMatter />} />
                <Route path="Matters" element={<Matter />} />
                <Route path="AddClient" element={<AddClient />} />
                <Route path="Login" element={<Login />} />
                <Route path="Timer" element={<Timer />} />
            </Routes>
        </Container>
    )
}

export default AppRouter; 