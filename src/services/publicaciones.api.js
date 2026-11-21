
const API_URL = 'http://localhost:3000/api';

export const obtenerCatalogo = async () => {
    const response = await fetch(`${API_URL}/catalogo`);

    if (!response.ok) {
        throw new Error('Error al obtener el catálogo');
    }

    const resultado = await response.json();

    return resultado.data;
};


export const obtenerDetallePublicacion = async (id) => {
    const response = await fetch(
        `http://localhost:3000/api/publicaciones/catalogo/${encodeURIComponent(id)}`
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
