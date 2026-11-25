
const API_URL = import.meta.env.VITE_API_URL;

export const obtenerCatalogo = async () => {
    const response = await fetch(`${API_URL}/catalogo`);

    const resultado = await response.json();

    if (!response.ok || !resultado.success) {
        throw new Error(
            resultado.message || 'Error al obtener el catálogo'
        );
    }

    return resultado.data;
};

export const obtenerDetallePublicacion = async (id) => {
    const response = await fetch(
        `${API_URL}/catalogo/${encodeURIComponent(id)}`
    );

    const resultado = await response.json();

    if (!response.ok || !resultado.success) {
        throw new Error(
            resultado.message ||
            'No se pudo obtener el detalle de la propiedad'
        );
    }

    return resultado.data;
};
