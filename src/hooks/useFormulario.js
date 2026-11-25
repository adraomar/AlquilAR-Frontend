
import { useState } from 'react';

import {
    validarPropiedad,
    prepararDatosPropiedad
} from '../utils/validarPropiedad';

const VALORES_INICIALES = {
    titulo: '',
    descripcion: '',
    tipo: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    habitaciones: '0',
    banios: '0',
    superficie_total: '',
    superficie_cubierta: '',
    cochera: false,
    balcon: false,
    patio: false,
    piscina: false
};

const useFormularioPropiedad = ({
    datosIniciales = {},
    onGuardar
}) => {

    const [formulario, setFormulario] = useState(() => ({
        ...VALORES_INICIALES,
        ...datosIniciales
    }));

    const [errores, setErrores] = useState({});
    const [error, setError] = useState('');
    const [guardando, setGuardando] = useState(false);

    const manejarCambio = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormulario(prev => ({
            ...prev,
            [name]: type === 'checkbox'
                ? checked
                : value
        }));

        setErrores(prev => ({
            ...prev,
            [name]: ''
        }));

        setError('');
    };

    const manejarSubmit = async (e) => {

        e.preventDefault();

        if (guardando) return;

        setError('');

        const nuevosErrores = validarPropiedad(formulario);

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {

            setError(
                'Revisá los campos indicados antes de continuar.'
            );

            return;
        }

        try {

            setGuardando(true);

            const datos = prepararDatosPropiedad(formulario);

            await onGuardar(datos);

        } catch (err) {

            setError(
                err.message ||
                'Ocurrió un error al guardar la propiedad'
            );

        } finally {

            setGuardando(false);

        }
    };

    return {
        formulario,
        errores,
        error,
        guardando,
        manejarCambio,
        manejarSubmit
    };
};

export default useFormularioPropiedad;
