import React from 'react'
import { Link } from 'react-router-dom';

import {
    House,
    MapPin,
    ArrowRight,
    Building2
} from 'lucide-react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const PropiedadesRecientes = ({ propiedades }) => {
    return (
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Encabezado */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-6">

                <div>

                    <h2 className="text-lg font-bold text-[#111827]">
                        Propiedades recientes
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Últimos inmuebles registrados
                    </p>

                </div>

                <Link
                    to="/admin/propiedades"
                    className="flex items-center gap-2 text-sm font-semibold text-[#E11D2E] transition hover:text-red-700"
                >
                    Ver todas
                    <ArrowRight size={17} />
                </Link>

            </div>

            {/* Sin propiedades */}
            {propiedades.length === 0 && (
                <div className="flex flex-col items-center px-6 py-12 text-center">

                    <Building2
                        size={36}
                        className="mb-4 text-gray-300"
                    />

                    <p className="font-medium text-gray-600">
                        No hay propiedades registradas
                    </p>

                </div>
            )}

            {/* Listado */}
            <div className="divide-y divide-gray-100">

                {propiedades.map(propiedad => (

                    <article
                        key={propiedad.id_propiedad}
                        className="flex flex-wrap items-center gap-4 px-6 py-4 transition hover:bg-gray-50 sm:flex-nowrap"
                    >

                        {/* Imagen */}
                        <div className="flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F4F5F7]">

                            {propiedad.imagen_portada ? (

                                <img
                                    src={`${SERVER_URL}${propiedad.imagen_portada}`}
                                    alt={propiedad.titulo}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />

                            ) : (

                                <House
                                    size={26}
                                    className="text-gray-400"
                                />

                            )}

                        </div>

                        {/* Información */}
                        <div className="min-w-0 flex-1">

                            <h3 className="truncate text-sm font-bold text-[#111827]">
                                {propiedad.titulo}
                            </h3>

                            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">

                                <MapPin
                                    size={14}
                                    className="shrink-0"
                                />

                                <span className="truncate">
                                    {propiedad.ciudad}, {propiedad.provincia}
                                </span>

                            </div>

                            <span className="mt-1 inline-block text-xs capitalize text-gray-500">
                                {propiedad.tipo}
                            </span>

                        </div>

                        {/* Fecha */}
                        <div className="hidden text-right lg:block">

                            <p className="text-xs text-gray-400">
                                Fecha de registro
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-700">
                                {new Date(propiedad.created_at)
                                    .toLocaleDateString('es-AR')}
                            </p>

                        </div>

                        {/* Estado */}
                        <span className={`
                            rounded-full px-3 py-1.5
                            text-xs font-semibold
                            ${propiedad.estado === 'activa'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                            }
                        `}>
                            {propiedad.estado === 'activa'
                                ? 'Activa'
                                : 'Inactiva'}
                        </span>

                    </article>

                ))}

            </div>

        </section>
    )
}

export default PropiedadesRecientes