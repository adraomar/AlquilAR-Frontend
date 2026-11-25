
const API_URL = import.meta.env.VITE_API_URL;

const peticion = async (endpoint, opciones = {}) => {
    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...opciones,
            headers: {
                'Content-Type': 'application/json',
                ...opciones.headers
            }
        }
    );

    const resultado = await response.json();

    if (!response.ok || !resultado.success) {
        const error = new Error(
            resultado.message || 'Ocurrió un error inesperado'
        );

        error.status = response.status;

        throw error;
    }

    return resultado.data;
};

export const registrarUsuario = async (datos) => {
    return peticion('/auth/registro', {
        method: 'POST',
        body: JSON.stringify(datos)
    });
};

export const iniciarSesion = async (credenciales) => {
    return peticion('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credenciales)
    });
};

export const obtenerSesion = async (token) => {
    return peticion('/auth/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const actualizarPerfil = async (token, datos) => {
    return peticion('/auth/me', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    });
};

export const cambiarPassword = async (token, datos) => {
    return peticion('/auth/me/password', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    });
};
