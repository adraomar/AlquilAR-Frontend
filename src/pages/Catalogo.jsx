
import { useEffect, useState, useMemo } from 'react';

import { obtenerCatalogo } from '../services/publicaciones.api';
import PropiedadCard from '../components/PropiedadCard/PropiedadCard';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';

import {
    MapPin,
    SlidersHorizontal
} from 'lucide-react';
import Footer from '../components/Footer/Footer';

const Catalogo = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    const [busqueda, setBusqueda] = useState('');
    const [operacion, setOperacion] = useState('todas');

    // Obtener propiedades desde la API
    useEffect(() => {
        const cargar = async () => {
            try {
                const datos = await obtenerCatalogo();
                setPropiedades(datos);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        cargar();
    }, []);

    // Filtrar propiedades
    const filtradas = useMemo(() => {
        const texto = busqueda.toLocaleLowerCase('es-AR').trim();

        return propiedades.filter((propiedad) => {
            const coincideBusqueda = [
                propiedad.titulo,
                propiedad.ciudad,
                propiedad.provincia,
                propiedad.direccion,
                propiedad.tipo
            ].some((valor) =>
                String(valor ?? '')
                    .toLocaleLowerCase('es-AR')
                    .includes(texto)
            );

            const coincideOperacion =
                operacion === 'todas' ||
                propiedad.tipo_operacion === operacion;

            return coincideBusqueda && coincideOperacion;
        });
    }, [propiedades, busqueda, operacion]);

    // Recibir filtros desde el Hero
    const manejarBusquedaHero = ({
        busqueda,
        operacion
    }) => {
        setBusqueda(busqueda);
        setOperacion(operacion);
    };

    return (
        <div className="min-h-screen bg-white">

            {/* Navbar */}
            <Navbar />

            {/* Nuevo Hero */}
            <Hero onBuscar={manejarBusquedaHero} />

            {/* Catálogo */}
            <main
                id="propiedades"
                className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-20 pt-20 lg:px-8"
            >
                {/* Encabezado */}

                <section className="rounded-2xl border border-gray-200 bg-[#F4F5F7] p-6 shadow-sm md:p-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-[#E11D2E]">
                                Nuestro catálogo
                            </span>

                            <h2 className="text-3xl font-extrabold tracking-tight text-[#111827]">
                                Propiedades disponibles
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Explorá las oportunidades que tenemos para vos.
                            </p>
                        </div>

                        {/* Filtro de operación */}
                        <div className="flex items-center gap-3">
                            <SlidersHorizontal
                                size={19}
                                className="text-[#E11D2E]"
                            />

                            <select
                                value={operacion}
                                onChange={(e) => setOperacion(e.target.value)}
                                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-[#E11D2E] focus:ring-2 focus:ring-red-100"
                            >
                                <option value="todas">
                                    Todas las operaciones
                                </option>
                                <option value="venta">
                                    En venta
                                </option>
                                <option value="alquiler">
                                    En alquiler
                                </option>
                            </select>
                        </div>
                    </div>
                </section>


                {/* Resultados */}

                {/* Resultados del catálogo */}
                <section className="mt-8 rounded-3xl border border-gray-200 bg-[#F4F5F7] p-5 shadow-sm md:p-8">

                    {/* Cantidad de resultados */}
                    {!cargando && !error && (
                        <div className="mb-7 flex items-center justify-between border-b border-gray-200 pb-5">
                            <div>
                                <h3 className="text-lg font-bold text-[#111827]">
                                    Explorá nuestras propiedades
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    <span className="font-bold text-[#E11D2E]">
                                        {filtradas.length}
                                    </span>
                                    {' '}propiedades encontradas
                                </p>
                            </div>

                            <span className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm sm:inline-block">
                                AlquilAR
                            </span>
                        </div>
                    )}

                    {/* Cargando */}
                    {cargando && (
                        <div className="py-20 text-center">
                            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#E11D2E]" />

                            <p className="text-sm text-gray-500">
                                Cargando propiedades...
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
                            <p className="font-medium text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Sin resultados */}
                    {!cargando && !error && filtradas.length === 0 && (
                        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                                <MapPin
                                    size={30}
                                    className="text-[#E11D2E]"
                                />
                            </div>

                            <h3 className="text-xl font-bold text-[#111827]">
                                No encontramos propiedades
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Probá con otra ubicación o tipo de operación.
                            </p>
                        </div>
                    )}

                    {/* Tarjetas de propiedades */}
                    {!cargando && !error && filtradas.length > 0 && (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {filtradas.map((propiedad) => (
                                <PropiedadCard
                                    key={propiedad.id_publicacion}
                                    propiedad={propiedad}
                                />
                            ))}
                        </div>
                    )}

                </section>

            </main>

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default Catalogo;
