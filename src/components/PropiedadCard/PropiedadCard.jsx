
import React from 'react';
import { Link } from 'react-router-dom';

import {
    MapPin,
    BedDouble,
    Bath,
    Maximize,
    ArrowUpRight,
    House
} from 'lucide-react';

const PropiedadCard = ({ propiedad }) => {
    const precio = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: propiedad.moneda,
        maximumFractionDigits: 0
    }).format(Number(propiedad.precio));

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">

            {/* Imagen */}
            <div className="relative h-60 overflow-hidden bg-gray-100">
                {propiedad.imagen_portada ? (
                    <img
                        src={`http://localhost:3000${propiedad.imagen_portada}`}
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
                <span className="absolute left-4 top-4 rounded-full bg-[#E11D2E] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                    {propiedad.tipo_operacion === 'venta'
                        ? 'En venta'
                        : 'En alquiler'}
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
                        className="shrink-0 text-[#E11D2E]"
                    />
                    {propiedad.ciudad}, {propiedad.provincia}
                </p>

                {/* Título */}
                <h3 className="mb-4 line-clamp-2 min-h-14 text-xl font-bold leading-snug text-[#111827]">
                    {propiedad.titulo}
                </h3>

                {/* Precio */}
                <p className="mb-5 text-2xl font-extrabold tracking-tight text-[#E11D2E]">
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

                {/* Ver propiedad */}
                <div className="mt-auto pt-6">
                    <Link
                        to={`/propiedades/${propiedad.id_publicacion}`}
                        className="flex items-center justify-between border-t border-gray-100 pt-5"
                    >
                        <span className="text-sm font-bold text-[#E11D2E]">
                            Ver propiedad
                        </span>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-[#E11D2E] transition-all duration-300 group-hover:bg-[#E11D2E] group-hover:text-white">
                            <ArrowUpRight
                                size={19}
                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default PropiedadCard;
