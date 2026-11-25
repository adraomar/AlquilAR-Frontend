
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Páginas públicas
import Catalogo from '../pages/Catalogo';
import DetallePropiedad from '../pages/DetallePropiedad';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import MiPerfil from '../pages/MiPerfil';
import AccesoDenegado from '../pages/AccesoDenegado';

// Páginas administrativas
import Dashboard from '../pages/Admin/Dashboard.jsx';
import ListadoPropiedades from '../pages/Admin/Propiedades/ListadoPropiedades';
import ListadoPublicaciones from '../pages/Admin/Publicaciones/ListadoPublicaciones';

// Layouts
import AdminLayout from '../components/AdminLayout/AdminLayout';

// Componentes y contexto
import ScrollManager from '../components/ScrollManager/ScrollManager';
import AuthProvider from '../context/AuthProvider';

// Protección de rutas
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
                            path="/admin"
                            element={<AdminLayout />}
                        >

                            <Route
                                index
                                element={<Dashboard />}
                            />

                            <Route
                                path="propiedades"
                                element={<ListadoPropiedades />}
                            />

                            <Route
                                path="publicaciones"
                                element={<ListadoPublicaciones />}
                            />

                        </Route>

                    </Route>

                </Routes>

            </AuthProvider>

        </BrowserRouter>
    );
};

export default RoutesMap;
