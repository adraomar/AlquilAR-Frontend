
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
    ArrowLeft,
    MapPin,
    BedDouble,
    Bath,
    Maximize,
    House,
    Car,
    Waves,
    Trees,
    Building2,
    Check,
    ArrowRight
} from 'lucide-react';

import Navbar from '../components/Navbar/Navbar';
import PropiedadGaleria from '../components/PropiedadGaleria/PropiedadGaleria';
import { obtenerDetallePublicacion } from '../services/publicaciones.api';
import useDocumentTitle from '../hooks/useDocumentTitle';

const DetallePropiedad = () => {
    const { id } = useParams();

    const [propiedad, setPropiedad] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let activo = true;

        const cargarDetalle = async () => {
            setCargando(true);
            setError('');
            setPropiedad(null);

            try {
                const datos = await obtenerDetallePublicacion(id);

                if (activo) {
                    setPropiedad(datos);
                }
            } catch (err) {
                if (activo) {
                    setError(err.message);
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        };

        cargarDetalle();

        return () => {
            activo = false;
        };
    }, [id]);

    const formatearPrecio = (valor, moneda) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: moneda,
            maximumFractionDigits: 0
        }).format(Number(valor));
    };

    const caracteristicas = propiedad ? [
        {
            icono: Car,
            nombre: 'Cochera',
            disponible: Boolean(propiedad.cochera)
        },
        {
            icono: Building2,
            nombre: 'Balcón',
            disponible: Boolean(propiedad.balcon)
        },
        {
            icono: Trees,
            nombre: 'Patio',
            disponible: Boolean(propiedad.patio)
        },
        {
            icono: Waves,
            nombre: 'Piscina',
            disponible: Boolean(propiedad.piscina)
        }
    ].filter((item) => item.disponible) : [];

    useDocumentTitle(propiedad?.titulo || 'Detalle de Propiedad');

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="mx-auto max-w-7xl px-5 pb-20 pt-8 lg:px-8">

                {/* Volver */}
                <Link
                    to="/#propiedades"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#E11D2E]"
                >
                    <ArrowLeft size={18} />
                    Volver al catálogo
                </Link>

                {/* Cargando */}
                {cargando && (
                    <div className="py-32 text-center">
                        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#E11D2E]" />
                        <p className="text-gray-500">
                            Cargando información de la propiedad...
                        </p>
                    </div>
                )}

                {/* Error */}
                {!cargando && error && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-16 text-center">
                        <h2 className="text-xl font-bold text-[#111827]">
                            No pudimos cargar la propiedad
                        </h2>

                        <p className="mt-3 text-sm text-red-600">
                            {error}
                        </p>

                        <Link
                            to="/"
                            className="mt-6 inline-flex rounded-xl bg-[#E11D2E] px-5 py-3 text-sm font-semibold text-white"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                )}

                {/* Detalle */}
                {!cargando && !error && propiedad && (
                    <>
                        {/* Encabezado */}
                        <div className="mb-8">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-[#E11D2E] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                                    {propiedad.tipo_operacion === 'venta'
                                        ? 'En venta'
                                        : 'En alquiler'}
                                </span>

                                <span className="rounded-full bg-[#F4F5F7] px-4 py-2 text-xs font-semibold capitalize text-[#111827]">
                                    {propiedad.tipo}
                                </span>
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
                                {propiedad.titulo}
                            </h1>

                            <p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                <MapPin
                                    size={18}
                                    className="shrink-0 text-[#E11D2E]"
                                />
                                {propiedad.direccion}, {propiedad.ciudad}, {propiedad.provincia}
                            </p>
                        </div>

                        {/* Galería */}
                        <PropiedadGaleria
                            imagenes={propiedad.imagenes || []}
                            titulo={propiedad.titulo}
                        />

                        {/* Información principal */}
                        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start">

                            {/* Columna izquierda */}
                            <div className="space-y-8">

                                {/* Datos principales */}
                                <section className="rounded-2xl border border-gray-200 bg-[#F4F5F7] p-6 md:p-8">
                                    <h2 className="mb-6 text-xl font-bold text-[#111827]">
                                        Características principales
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                                        {propiedad.tipo !== 'terreno' && (
                                            <>
                                                <div className="rounded-xl bg-white p-4">
                                                    <BedDouble
                                                        size={23}
                                                        className="mb-3 text-[#E11D2E]"
                                                    />
                                                    <p className="text-xl font-bold text-[#111827]">
                                                        {propiedad.habitaciones}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Habitaciones
                                                    </p>
                                                </div>

                                                <div className="rounded-xl bg-white p-4">
                                                    <Bath
                                                        size={23}
                                                        className="mb-3 text-[#E11D2E]"
                                                    />
                                                    <p className="text-xl font-bold text-[#111827]">
                                                        {propiedad.banios}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Baños
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        <div className="rounded-xl bg-white p-4">
                                            <Maximize
                                                size={23}
                                                className="mb-3 text-[#E11D2E]"
                                            />
                                            <p className="text-xl font-bold text-[#111827]">
                                                {propiedad.superficie_total ?? '-'}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Superficie total (m²)
                                            </p>
                                        </div>

                                        {propiedad.superficie_cubierta != null && (
                                            <div className="rounded-xl bg-white p-4">
                                                <House
                                                    size={23}
                                                    className="mb-3 text-[#E11D2E]"
                                                />
                                                <p className="text-xl font-bold text-[#111827]">
                                                    {propiedad.superficie_cubierta}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Superficie cubierta (m²)
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                {/* Descripción */}
                                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                                    <h2 className="mb-5 text-xl font-bold text-[#111827]">
                                        Descripción de la propiedad
                                    </h2>

                                    <p className="whitespace-pre-line text-sm leading-8 text-gray-600">
                                        {propiedad.descripcion ||
                                            'Esta propiedad todavía no tiene una descripción disponible.'}
                                    </p>
                                </section>

                                {/* Comodidades */}
                                <section className="rounded-2xl border border-gray-200 bg-[#F4F5F7] p-6 md:p-8">
                                    <h2 className="mb-6 text-xl font-bold text-[#111827]">
                                        Comodidades
                                    </h2>

                                    {caracteristicas.length > 0 ? (
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {caracteristicas.map((item) => {
                                                const Icono = item.icono;

                                                return (
                                                    <div
                                                        key={item.nombre}
                                                        className="flex items-center gap-3 rounded-xl bg-white p-4"
                                                    >
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                                                            <Icono
                                                                size={20}
                                                                className="text-[#E11D2E]"
                                                            />
                                                        </div>

                                                        <span className="flex-1 text-sm font-semibold text-[#111827]">
                                                            {item.nombre}
                                                        </span>

                                                        <Check
                                                            size={17}
                                                            className="text-[#E11D2E]"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            No hay comodidades adicionales registradas.
                                        </p>
                                    )}
                                </section>
                            </div>

                            {/* Columna derecha */}
                            <aside className="lg:sticky lg:top-28">
                                <div className="rounded-2xl border border-gray-200 bg-[#F4F5F7] p-6 shadow-sm">

                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                        Precio de {propiedad.tipo_operacion}
                                    </p>

                                    <p className="mt-3 break-words text-3xl font-extrabold tracking-tight text-[#E11D2E]">
                                        {formatearPrecio(
                                            propiedad.precio,
                                            propiedad.moneda
                                        )}
                                    </p>

                                    <div className="my-6 border-t border-gray-200" />

                                    <p className="text-sm leading-7 text-gray-600">
                                        ¿Te interesa esta propiedad?
                                        Contactanos para recibir más información
                                        o coordinar una visita.
                                    </p>

                                    <a
                                        href="/#contacto"
                                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E11D2E] px-5 py-4 text-sm font-bold text-white transition hover:bg-red-700"
                                    >
                                        Consultar propiedad
                                        <ArrowRight size={18} />
                                    </a>

                                    <Link
                                        to="/#propiedades"
                                        className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-4 text-sm font-semibold text-[#111827] transition hover:bg-gray-50"
                                    >
                                        Ver otras propiedades
                                    </Link>
                                </div>
                            </aside>
                        </div>
                    </>
                )}
            </main>

            {/* Footer */}
            <footer
                id="contacto"
                className="bg-[#111827] px-6 py-10 text-center"
            >
                <p className="text-xl font-extrabold text-white">
                    Alquil<span className="text-[#E11D2E]">AR</span>
                </p>

                <p className="mt-2 text-sm text-gray-400">
                    Encontrá el lugar que querés llamar hogar.
                </p>
            </footer>
        </div>
    );
};

export default DetallePropiedad;
