
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
    Building2,
    CircleCheck,
    Archive,
    Plus,
    RefreshCw,
    LoaderCircle,
    AlertCircle,
    CheckCircle2,
    X
} from 'lucide-react';

import useDocumentTitle from '../../../hooks/useDocumentTitle';
import usePropiedades from '../../../hooks/usePropiedades';

import StatCard from '../../../components/admin/StatCard/StatCard';
import FiltrosPropiedades from '../../../components/Admin/Propiedades/FiltrosPropiedades/FiltrosPropiedades';
import TablaPropiedades from '../../../components/Admin/Propiedades/TablaPropiedades/TablaPropiedades';
import Paginacion from '../../../components/Paginacion/Paginacion';

const ListadoPropiedades = () => {

    useDocumentTitle('Gestión de propiedades');

    const {
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
    } = usePropiedades();

    const location = useLocation();
    const navigate = useNavigate();

    const [mensaje, setMensaje] = useState('');

    useEffect(() => {

        if (location.state?.mensaje) {

            setMensaje(location.state.mensaje);

            navigate(
                `${location.pathname}${location.search}${location.hash}`,
                {
                    replace: true,
                    state: null
                }
            );

        }

    }, [location, navigate]);

    useEffect(() => {

        if (!mensaje) return;

        const temporizador = setTimeout(() => {
            setMensaje('');
        }, 5000);

        return () => clearTimeout(temporizador);

    }, [mensaje]);

    return (
        <div className="space-y-6">

            {/* Encabezado */}
            <div className="flex flex-wrap items-center justify-between gap-4">

                <div>

                    <span className="text-xs font-bold uppercase tracking-widest text-[#E11D2E]">
                        Gestión inmobiliaria
                    </span>

                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827]">
                        Propiedades
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Administrá los inmuebles registrados en AlquilAR.
                    </p>

                </div>

                <div className="flex flex-wrap items-center gap-3">

                    <button
                        type="button"
                        onClick={recargar}
                        disabled={cargando}
                        aria-label="Actualizar propiedades"
                        title="Actualizar propiedades"
                        className="flex cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white p-3 text-gray-600 shadow-sm transition hover:bg-gray-100 disabled:opacity-50"
                    >

                        <RefreshCw
                            size={19}
                            className={cargando ? 'animate-spin' : ''}
                        />

                    </button>

                    <Link
                        to="/admin/propiedades/nueva"
                        className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#E11D2E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                    >

                        <Plus size={19} />

                        Nueva propiedad

                    </Link>

                </div>

            </div>

            {mensaje && (

                <div
                    role="status"
                    className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800"
                >

                    <CheckCircle2
                        size={21}
                        className="shrink-0"
                    />

                    <p className="flex-1 text-sm font-medium">
                        {mensaje}
                    </p>

                    <button
                        type="button"
                        onClick={() => setMensaje('')}
                        aria-label="Cerrar notificación"
                        className="cursor-pointer rounded-lg p-1 transition hover:bg-green-100"
                    >
                        <X size={18} />
                    </button>

                </div>

            )}

            {/* Estadísticas */}
            {estadisticas && (

                <section className="grid gap-4 sm:grid-cols-3">

                    <StatCard
                        titulo="Total de propiedades"
                        valor={estadisticas.total}
                        descripcion="Inmuebles registrados"
                        icon={Building2}
                        color="azul"
                    />

                    <StatCard
                        titulo="Propiedades activas"
                        valor={estadisticas.activas}
                        descripcion="Disponibles para gestionar"
                        icon={CircleCheck}
                        color="verde"
                    />

                    <StatCard
                        titulo="Propiedades inactivas"
                        valor={estadisticas.inactivas}
                        descripcion="Inmuebles desactivados"
                        icon={Archive}
                        color="naranja"
                    />

                </section>

            )}

            {errorEstadisticas && (

                <p role="alert" className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                    No se pudieron cargar las estadísticas generales.
                    El listado puede seguir utilizándose.
                </p>

            )}

            {/* Listado */}
            <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                <FiltrosPropiedades
                    filtros={filtros}
                    onCambiarFiltro={cambiarFiltro}
                    onLimpiar={limpiarFiltros}
                />

                {/* Cantidad de resultados */}
                {!cargando && !error && paginacion && (

                    <div className="border-b border-gray-100 px-5 py-4">

                        <p className="text-sm text-gray-500">

                            <span className="font-bold text-[#111827]">
                                {paginacion.total}
                            </span>

                            {' '}propiedades encontradas

                        </p>

                    </div>

                )}

                {/* Cargando */}
                {cargando && (

                    <div
                        role="status"
                        className="flex flex-col items-center justify-center py-20"
                    >

                        <LoaderCircle
                            size={34}
                            className="animate-spin text-[#E11D2E]"
                        />

                        <p className="mt-4 text-sm text-gray-500">
                            Cargando propiedades...
                        </p>

                    </div>

                )}

                {/* Error */}
                {!cargando && error && (

                    <div
                        role="alert"
                        className="flex flex-col items-center p-10 text-center"
                    >

                        <AlertCircle
                            size={35}
                            className="text-[#E11D2E]"
                        />

                        <h3 className="mt-4 font-bold text-[#111827]">
                            No se pudieron cargar las propiedades
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={recargar}
                            className="mt-5 cursor-pointer rounded-xl bg-[#E11D2E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            Reintentar
                        </button>

                    </div>

                )}

                {/* Tabla */}
                {!cargando && !error && (

                    <>

                        <TablaPropiedades
                            propiedades={propiedades}
                        />

                        {paginacion?.total_paginas > 1 && (

                            <div className="border-t border-gray-100 px-5 py-5">

                                <Paginacion
                                    paginaActual={paginacion.pagina}
                                    totalPaginas={paginacion.total_paginas}
                                    totalResultados={paginacion.total}
                                    elementosPorPagina={paginacion.limite}
                                    onCambiarPagina={cambiarPagina}
                                />

                            </div>

                        )}

                    </>

                )}

            </section>

        </div>
    );
};

export default ListadoPropiedades;
