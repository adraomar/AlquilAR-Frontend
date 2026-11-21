import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogo from "../pages/Catalogo";
import DetallePropiedad from '../pages/DetallePropiedad';
import ScrollManager from '../components/ScrollManager/ScrollManager';

const RoutesMap = () => {
    return (
        <BrowserRouter>
            <ScrollManager/>
            <Routes>
                <Route path="/" element={<Catalogo/>} />
                <Route path="/propiedades/:id" element={<DetallePropiedad/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesMap