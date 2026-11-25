
import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import { obtenerPropiedades } from '../services/propiedades.api.js';
import { obtenerResumenDashboard } from '../services/dashboard.api.js';

const FILTROS_INICIALES = {
    pagina: 1,
    limite: 10,
    estado: 'todas',
    tipo: 'todos',
    busqueda: ''
};

const usePropiedades = () => {

    const { token, logout } = useAuth();

    const [propiedades, setPropiedades] = useState([]);
    const [paginacion, setPaginacion] = useState(null);
    const [estadisticas, setEstadisticas] = useState(null);

    const [filtros, setFiltros] = useState({
        ...FILTROS_INICIALES
    });

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [errorEstadisticas, setErrorEstadisticas] = useState('');
    const [actualizacion, setActualizacion] = useState(0);

    // Obtener propiedades según los filtros
    useEffect(() => {

        if (!token) return;

        const controller = new AbortController();

        const cargarPropiedades = async () => {

            try {

                setCargando(true);
                setError('');

                const resultado = await obtenerPropiedades(
                    token,
                    filtros,
                    controller.signal
                );

                if (controller.signal.aborted) return;

                const ultimaPagina = Math.max(
                    1,
                    resultado.paginacion.total_paginas
                );

                if (filtros.pagina > ultimaPagina) {

                    setFiltros(prev => ({
                        ...prev,
                        pagina: ultimaPagina
                    }));

                    return;
                }

                setPropiedades(resultado.propiedades);
                setPaginacion(resultado.paginacion);

            } catch (err) {

                if (controller.signal.aborted) return;

                if (err.status === 401) {
                    logout();
                    return;
                }

                setError(err.message);

            } finally {

                if (!controller.signal.aborted) {
                    setCargando(false);
                }

            }
        };

        cargarPropiedades();

        return () => controller.abort();

    }, [token, filtros, actualizacion, logout]);

    // Obtener estadísticas generales
    useEffect(() => {

        if (!token) return;

        const controller = new AbortController();

        const cargarEstadisticas = async () => {

            try {

                setErrorEstadisticas('');

                const resultado = await obtenerResumenDashboard(
                    token,
                    controller.signal
                );

                if (!controller.signal.aborted) {
                    setEstadisticas(resultado.propiedades);
                }

            } catch (err) {

                if (controller.signal.aborted) return;

                if (err.status === 401) {
                    logout();
                    return;
                }

                setEstadisticas(null);
                setErrorEstadisticas(err.message);

            }
        };

        cargarEstadisticas();

        return () => controller.abort();

    }, [token, actualizacion, logout]);

    const cambiarFiltro = (campo, valor) => {

        setFiltros(prev => ({
            ...prev,
            [campo]: valor,
            pagina: 1
        }));
    };

    const cambiarPagina = (pagina) => {

        if (
            pagina < 1 ||
            pagina > (paginacion?.total_paginas ?? 1)
        ) return;

        setFiltros(prev => ({
            ...prev,
            pagina
        }));
    };

    const limpiarFiltros = () => {
        setFiltros({ ...FILTROS_INICIALES });
    };

    const recargar = () => {
        setActualizacion(prev => prev + 1);
    };

    return {
        propiedades,
        paginacion,
        estadisticas,
        filtros,
        cargando,
        error,
        errorEstadisticas,
        cambiarFiltro,
        cambiarPagina,
        limpiarFiltros,
        recargar
    };
};

export default usePropiedades;
