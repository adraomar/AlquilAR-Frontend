
const API_URL = import.meta.env.VITE_API_URL;

export const obtenerPropiedades = async (
    token,
    filtros = {},
    signal
) => {

    const parametros = new URLSearchParams({
        pagina: filtros.pagina ?? 1,
        limite: filtros.limite ?? 10,
        estado: filtros.estado ?? 'todas',
        tipo: filtros.tipo ?? 'todos',
        busqueda: filtros.busqueda ?? ''
    });

    const response = await fetch(
        `${API_URL}/propiedades?${parametros}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
            signal
        }
    );

    const resultado = await response.json();

    if (!response.ok || !resultado.success) {

        const error = new Error(
            resultado.message ||
            'No se pudieron obtener las propiedades'
        );

        error.status = response.status;

        throw error;
    }

    return {
        propiedades: resultado.data,
        paginacion: resultado.paginacion
    };
};


export const crearPropiedad = async (token, datos) => {

    const response = await fetch(
        `${API_URL}/propiedades`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        }
    );

    const resultado = await response.json();

    if (!response.ok || !resultado.success) {

        const error = new Error(
            resultado.message ||
            'No se pudo registrar la propiedad'
        );

        error.status = response.status;

        throw error;
    }

    return resultado.data;
};

