
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
    Building2,
    ClipboardList,
    ArrowRight,
    Tag,
    KeyRound,
    RefreshCw,
    LoaderCircle,
    AlertCircle
} from 'lucide-react';

import useAuth from '../../hooks/useAuth';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import { obtenerResumenDashboard } from '../../services/dashboard.api';

import StatCard from '../../components/Admin/StatCard/StatCard';
import EstadoPublicaciones from '../../components/Admin/EstadoPublicaciones/EstadoPublicaciones';
import TiposPropiedades from '../../components/Admin/TiposPropiedades/TiposPropiedades';
import PropiedadesRecientes from '../../components/Admin/PropiedadesRecientes/PropiedadesRecientes';

const Dashboard = () => {

    useDocumentTitle('Panel administrativo');

    const { usuario, token, logout } = useAuth();

    const [resumen, setResumen] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [actualizacion, setActualizacion] = useState(0);

    useEffect(() => {

        if (!token) return;

        const controller = new AbortController();

        const cargarResumen = async () => {

            try {

                setCargando(true);
                setError('');

                const datos = await obtenerResumenDashboard(
                    token,
                    controller.signal
                );

                if (!controller.signal.aborted) {
                    setResumen(datos);
                }

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

        cargarResumen();

        return () => controller.abort();

    }, [token, actualizacion, logout]);

    const actualizarDashboard = () => {
        setActualizacion(prev => prev + 1);
    };

    const accesosRapidos = [
        {
            titulo: 'Gestionar propiedades',
            descripcion: 'Registrá, editá y administrá los inmuebles.',
            ruta: '/admin/propiedades',
            enlace: 'Ir a propiedades',
            icon: Building2,
            color: 'bg-blue-50 text-blue-600'
        },
        {
            titulo: 'Gestionar publicaciones',
            descripcion: 'Administrá las operaciones de venta y alquiler.',
            ruta: '/admin/publicaciones',
            enlace: 'Ir a publicaciones',
            icon: ClipboardList,
            color: 'bg-green-50 text-green-700'
        }
    ];

    return (
        <div className="space-y-8">

            {/* Encabezado */}
            <div className="flex flex-wrap items-center justify-between gap-4">

                <div>

                    <span className="text-xs font-bold uppercase tracking-widest text-[#E11D2E]">
                        Administración
                    </span>

                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827]">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Resumen general de la actividad inmobiliaria.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={actualizarDashboard}
                    disabled={cargando}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    <RefreshCw
                        size={17}
                        className={cargando ? 'animate-spin' : ''}
                    />

                    Actualizar

                </button>

            </div>

            {/* Bienvenida */}
            <section className="relative overflow-hidden rounded-2xl bg-[#111827] p-8 text-white shadow-sm">

                <div className="relative z-10">

                    <p className="text-sm font-medium text-gray-400">
                        Panel de control
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        ¡Hola, {usuario?.nombre}!
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300">
                        Consultá el estado actual de tu inmobiliaria
                        y administrá las propiedades y publicaciones
                        desde un único lugar.
                    </p>

                </div>

                <Building2
                    size={180}
                    strokeWidth={0.8}
                    className="absolute -bottom-8 right-4 text-white/5"
                />

            </section>

            {/* Estado de carga */}
            {cargando && (

                <div
                    role="status"
                    className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-20 shadow-sm"
                >

                    <LoaderCircle
                        size={36}
                        className="animate-spin text-[#E11D2E]"
                    />

                    <p className="mt-4 text-sm font-medium text-gray-500">
                        Cargando estadísticas...
                    </p>

                </div>

            )}

            {/* Estado de error */}
            {!cargando && error && (

                <div
                    role="alert"
                    className="flex flex-col items-center rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm"
                >

                    <AlertCircle
                        size={36}
                        className="text-[#E11D2E]"
                    />

                    <h3 className="mt-4 font-bold text-[#111827]">
                        No se pudo cargar el dashboard
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={actualizarDashboard}
                        className="mt-5 cursor-pointer rounded-xl bg-[#E11D2E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                        Reintentar
                    </button>

                </div>

            )}

            {/* Estadísticas */}
            {!cargando && !error && resumen && (

                <>

                    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            titulo="Total de propiedades"
                            valor={resumen.propiedades.total}
                            descripcion={`${resumen.propiedades.activas} activas · ${resumen.propiedades.inactivas} inactivas`}
                            icon={Building2}
                            color="azul"
                        />

                        <StatCard
                            titulo="Publicaciones visibles"
                            valor={resumen.publicaciones.visibles}
                            descripcion={`De ${resumen.publicaciones.total} publicaciones registradas`}
                            icon={ClipboardList}
                            color="violeta"
                        />

                        <StatCard
                            titulo="En venta"
                            valor={resumen.publicaciones.en_venta}
                            descripcion="Disponibles en el catálogo"
                            icon={Tag}
                            color="verde"
                        />

                        <StatCard
                            titulo="En alquiler"
                            valor={resumen.publicaciones.en_alquiler}
                            descripcion="Disponibles en el catálogo"
                            icon={KeyRound}
                            color="azul"
                        />

                    </section>

                    {/* Gráficos */}
                    <div className="grid gap-6 lg:grid-cols-2">

                        <EstadoPublicaciones
                            publicaciones={resumen.publicaciones}
                        />

                        <TiposPropiedades
                            tipos={resumen.tipos_propiedades}
                        />

                    </div>

                    {/* Propiedades recientes */}
                    <PropiedadesRecientes
                        propiedades={resumen.propiedades_recientes}
                    />

                </>

            )}

            {/* Accesos rápidos */}
            <section>

                <h2 className="mb-5 text-xl font-bold text-[#111827]">
                    Accesos rápidos
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                    {accesosRapidos.map(acceso => {

                        const Icon = acceso.icon;

                        return (
                            <Link
                                key={acceso.ruta}
                                to={acceso.ruta}
                                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >

                                <div className={`
                                    mb-5 flex h-12 w-12
                                    items-center justify-center
                                    rounded-xl ${acceso.color}
                                `}>

                                    <Icon size={25} />

                                </div>

                                <h3 className="text-lg font-bold text-[#111827]">
                                    {acceso.titulo}
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    {acceso.descripcion}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#E11D2E]">

                                    {acceso.enlace}

                                    <ArrowRight
                                        size={17}
                                        className="transition-transform group-hover:translate-x-1"
                                    />

                                </div>

                            </Link>
                        );
                    })}

                </div>

            </section>

        </div>
    );
};

export default Dashboard;
