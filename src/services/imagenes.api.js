
const API_URL = import.meta.env.VITE_API_URL;

export const obtenerImagenes = async (idPropiedad) => {
    const response = await fetch(
        `${API_URL}/propiedades/${idPropiedad}/imagenes`
    );

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(resultado.message);
    }

    return resultado.data;
};

export const subirImagenes = async (idPropiedad, archivos) => {
    const formData = new FormData();

    for (const archivo of archivos) {
        formData.append('imagenes', archivo);
    }

    const response = await fetch(
        `${API_URL}/propiedades/${idPropiedad}/imagenes`,
        {
            method: 'POST',
            body: formData
        }
    );

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(resultado.message);
    }

    return resultado.data;
};

export const establecerPortada = async (
    idPropiedad,
    idImagen
) => {
    const response = await fetch(
        `${API_URL}/propiedades/${idPropiedad}/imagenes/${idImagen}/portada`,
        { method: 'PUT' }
    );

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(resultado.message);
    }

    return resultado.data;
};

export const eliminarImagen = async (
    idPropiedad,
    idImagen
) => {
    const response = await fetch(
        `${API_URL}/propiedades/${idPropiedad}/imagenes/${idImagen}`,
        { method: 'DELETE' }
    );

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(resultado.message);
    }

    return resultado;
};
