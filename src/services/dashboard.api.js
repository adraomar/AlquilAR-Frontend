
const API_URL = import.meta.env.VITE_API_URL;

export const obtenerResumenDashboard = async (token, signal) => {

    const response = await fetch(
        `${API_URL}/dashboard/resumen`,
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
            'No se pudo obtener el resumen del dashboard'
        );

        error.status = response.status;

        throw error;
    }

    return resultado.data;
};
