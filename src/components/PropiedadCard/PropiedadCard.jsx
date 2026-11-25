
import { Link } from 'react-router-dom';

import {
    MapPin,
    BedDouble,
    Bath,
    Maximize,
    ArrowRight,
    House
} from 'lucide-react';

const PropiedadCard = ({ propiedad }) => {

    const precio = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: propiedad.moneda,
        maximumFractionDigits: 0
    }).format(Number(propiedad.precio));

    const esVenta = propiedad.tipo_operacion === 'venta';

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">

            {/* Imagen */}
            <div className="relative h-60 overflow-hidden bg-gray-100">

                {propiedad.imagen_portada ? (
                    <img
                        src={`${import.meta.env.VITE_SERVER_URL}${propiedad.imagen_portada}`}
                        alt={propiedad.titulo}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-400">

                        <House size={45} strokeWidth={1.2} />

                        <span className="text-sm">
                            Imagen próximamente
                        </span>

                    </div>
                )}

                {/* Etiqueta de operación */}
                <span
                    className={`
                        absolute left-4 top-4 rounded-full
                        px-4 py-2 text-xs font-bold uppercase
                        tracking-wide text-white shadow-md
                        ${esVenta
                            ? 'bg-green-700'
                            : 'bg-blue-600'
                        }
                    `}
                >
                    {esVenta ? 'En venta' : 'En alquiler'}
                </span>

                {/* Tipo de propiedad */}
                <span className="absolute bottom-4 right-4 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold capitalize text-[#111827] shadow-sm backdrop-blur">
                    {propiedad.tipo}
                </span>

            </div>

            {/* Información */}
            <div className="flex flex-1 flex-col p-6">

                {/* Ubicación */}
                <p className="mb-3 flex items-center gap-2 text-sm text-gray-500">

                    <MapPin
                        size={16}
                        className="shrink-0 text-gray-500"
                    />

                    {propiedad.ciudad}, {propiedad.provincia}

                </p>

                {/* Título */}
                <h3 className="mb-4 line-clamp-2 min-h-14 text-xl font-bold leading-snug text-[#111827]">
                    {propiedad.titulo}
                </h3>

                {/* Precio */}
                <p className="mb-5 text-2xl font-extrabold tracking-tight text-[#111827]">
                    {precio}
                </p>

                {/* Características */}
                <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5 text-sm text-gray-600">

                    {propiedad.tipo !== 'terreno' && (
                        <>
                            <span className="flex items-center gap-1.5 rounded-lg bg-[#F4F5F7] px-3 py-2">

                                <BedDouble
                                    size={17}
                                    className="text-gray-500"
                                />

                                {propiedad.habitaciones} hab.

                            </span>

                            <span className="flex items-center gap-1.5 rounded-lg bg-[#F4F5F7] px-3 py-2">

                                <Bath
                                    size={17}
                                    className="text-gray-500"
                                />

                                {propiedad.banios} baños

                            </span>
                        </>
                    )}

                    <span className="flex items-center gap-1.5 rounded-lg bg-[#F4F5F7] px-3 py-2">

                        <Maximize
                            size={17}
                            className="text-gray-500"
                        />

                        {propiedad.superficie_total ?? '-'} m²

                    </span>

                </div>

                {/* Botón Más información */}
                <div className="mt-auto pt-6">

                    <Link
                        to={`/propiedades/${propiedad.id_publicacion}`}
                        className="group/boton flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#E11D2E] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-md active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D2E]"
                    >

                        Más información

                        <ArrowRight
                            size={18}
                            className="transition-transform duration-300 group-hover/boton:translate-x-1"
                        />

                    </Link>

                </div>

            </div>

        </article>
    );
};

export default PropiedadCard;
