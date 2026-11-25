import React, { useState, useEffect, useCallback } from 'react'
import { AuthContext } from './AuthContext'
import { iniciarSesion, obtenerSesion, actualizarPerfil as actualizarPerfilAPI, cambiarPassword as cambiarPasswordAPI } from '../services/auth.api.js';

const TOKEN_KEY = 'alquilar_token';

const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    const [token, setToken] = useState(
        () => sessionStorage.getItem(TOKEN_KEY)
    );

    const [cargando, setCargando] = useState(true);
    const [errorSesion, setErrorSesion] = useState('');

    // Cerrar sesión
    const logout = useCallback(() => {

        sessionStorage.removeItem(TOKEN_KEY);

        setToken(null);
        setUsuario(null);
        setErrorSesion('');

    }, []);

    // Validar sesión contra el backend
    useEffect(() => {

        let activo = true;

        const validarSesion = async () => {

            if (!token) {
                setUsuario(null);
                setCargando(false);
                return;
            }

            try {

                setCargando(true);
                setErrorSesion('');

                const datosUsuario = await obtenerSesion(token);

                if (activo) {
                    setUsuario(datosUsuario);
                }

            } catch (error) {

                if (!activo) return;

                if (
                    error.status === 401 ||
                    error.status === 403
                ) {
                    logout();
                } else {
                    setUsuario(null);
                    setErrorSesion(
                        'No se pudo verificar la sesión'
                    );
                }

            } finally {

                if (activo) {
                    setCargando(false);
                }

            }
        };

        validarSesion();

        return () => {
            activo = false;
        };

    }, [token, logout]);

    // Iniciar sesión
    const login = async (credenciales) => {

        const resultado = await iniciarSesion(credenciales);

        sessionStorage.setItem(
            TOKEN_KEY,
            resultado.token
        );

        setErrorSesion('');
        setUsuario(resultado.usuario);
        setToken(resultado.token);

        return resultado.usuario;
    };

    // Comprobar un rol específico
    const tieneRol = (rol) => {

        return usuario?.roles?.includes(rol) ?? false;

    };

    // Comprobar cualquiera de los roles recibidos
    const tieneAlgunRol = (...roles) => {

        return roles.some(rol => tieneRol(rol));

    };

    const autenticado = Boolean(usuario && token);

    const actualizarPerfil = async (datos) => {

        try {

            const usuarioActualizado = await actualizarPerfilAPI(
                token,
                datos
            );

            setUsuario(usuarioActualizado);

            return usuarioActualizado;

        } catch (error) {

            if (error.status === 401 || error.status === 403) {
                logout();
            }

            throw error;
        }
    };

    const cambiarPassword = async (datos) => {

        try {

            await cambiarPasswordAPI(token, datos);

        } catch (error) {

            if (error.status === 401 || error.status === 403) {
                logout();
            }

            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                token,
                cargando,
                autenticado,
                errorSesion,
                login,
                logout,
                tieneRol,
                tieneAlgunRol,
                actualizarPerfil,
                cambiarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider