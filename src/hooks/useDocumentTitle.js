import { useEffect } from 'react';

const useDocumentTitle = (titulo) => {
    useEffect(() => {
        document.title = titulo ? `AlquilAR - ${titulo}` : 'Alquilar - Gestion Inmobiliaria'
    }, [titulo]);
}

export default useDocumentTitle;