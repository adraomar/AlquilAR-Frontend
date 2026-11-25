import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Catalogo from "../pages/Catalogo";
import DetallePropiedad from '../pages/DetallePropiedad';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import MiPerfil from '../pages/MiPerfil';
import AccesoDenegado from '../pages/AccesoDenegado';

import ScrollManager from '../components/ScrollManager/ScrollManager';
import AuthProvider from '../context/AuthProvider';

import ProtectedRoute from '../routes/ProtectedRoute';
import PublicRoute from '../routes/PublicRoute';

import { ROLES } from '../config/roles.js';

const RoutesMap = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ScrollManager />
                <Routes>

                    {/* Rutas de acceso libre */}
                    <Route
                        path="/"
                        element={<Catalogo />}
                    />

                    <Route
                        path="/propiedades/:id"
                        element={<DetallePropiedad />}
                    />

                    <Route
                        path="/403"
                        element={<AccesoDenegado />}
                    />

                    {/* Solo usuarios sin sesión */}
                    <Route element={<PublicRoute />}>

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/registro"
                            element={<Registro />}
                        />

                    </Route>

                    {/* Cualquier usuario autenticado */}
                    <Route element={<ProtectedRoute />}>

                        <Route
                            path="/mi-perfil"
                            element={<MiPerfil />}
                        />

                    </Route>

                    {/* Administradores del sistema */}
                    <Route
                        element={
                            <ProtectedRoute
                                rolesPermitidos={[
                                    ROLES.ADMIN_SISTEMA
                                ]}
                            />
                        }
                    >
                        <Route
                            path="/admin"
                            element={
                                <div className="p-10">
                                    <h1 className="text-2xl font-bold">
                                        Panel de administración
                                    </h1>
                                    <p>Panel en desarrollo.</p>
                                </div>
                            }
                        />

                    </Route>

                    {/* Administración inmobiliaria */}
                    <Route
                        element={
                            <ProtectedRoute
                                rolesPermitidos={[
                                    ROLES.ADMIN_SISTEMA,
                                    ROLES.ADMIN_INMOBILIARIA
                                ]}
                            />
                        }
                    >
                        <Route
                            path="/admin/propiedades"
                            element={
                                <div className="p-10">
                                    <h1 className="text-2xl font-bold">
                                        Gestión de propiedades
                                    </h1>
                                    <p>Módulo en desarrollo.</p>
                                </div>
                            }
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default RoutesMap