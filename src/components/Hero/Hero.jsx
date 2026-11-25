import React, { useState } from 'react'
import {
    ArrowRight,
    Search,
    MapPin,
    House,
    KeyRound
} from 'lucide-react';

const Hero = ({ onBuscar }) => {
    const [busqueda, setBusqueda] = useState('');
    const [operacion, setOperacion] = useState('todas');

    const manejarBusqueda = (e) => {
        e.preventDefault();

        onBuscar({
            busqueda: busqueda.trim(),
            operacion
        });

        document.getElementById('propiedades')?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (
        <section id="inicio" className="bg-white px-5 pt-8 lg:px-8">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#F4F5F7]">

                <div className="grid min-h-[490px] lg:grid-cols-2">

                    {/* Texto */}
                    <div className="relative z-10 flex flex-col justify-center px-7 py-12 md:px-12 lg:px-16">

                        <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-[#111827] md:text-5xl lg:text-[54px]">
                            Encontrá el lugar que querés
                            <span className="text-[#E11D2E]">
                                {' '}llamar hogar.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-md text-base leading-8 text-gray-600">
                            Descubrí casas, departamentos y terrenos
                            seleccionados para vos. Tu próxima etapa
                            comienza en AlquilAR.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#propiedades"
                                className="inline-flex items-center gap-2 rounded-xl bg-[#E11D2E] px-6 py-4 text-sm font-bold text-white transition hover:bg-red-700"
                            >
                                Ver propiedades
                                <ArrowRight size={18} />
                            </a>

                            <a
                                href="#nosotros"
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-4 text-sm font-bold text-gray-800 transition hover:border-gray-500"
                            >
                                Conocenos
                            </a>
                        </div>
                    </div>

                    {/* Imagen */}
                    <div className="relative min-h-[290px] lg:min-h-full">
                        <img
                            src="/alquilar-banner.jpg"
                            alt="Casa moderna con jardín"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent lg:bg-gradient-to-r lg:from-[#F4F5F7]/30 lg:to-transparent" />
                    </div>
                </div>
            </div>

            {/* Buscador */}
            <div className="mx-auto mt-8 max-w-5xl px-3 md:mt-10">
                <form
                    onSubmit={manejarBusqueda}
                    className="grid gap-3 rounded-2xl border border-gray-200 bg-[#F4F5F7] p-4 shadow-lg md:grid-cols-[minmax(0,1fr)_210px_auto] md:items-center"
                >
                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                        <MapPin size={20} className="shrink-0 text-[#E11D2E]" />

                        <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Ciudad, barrio o propiedad..."
                            aria-label="Buscar propiedades"
                            className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        />
                    </div>

                    <select
                        value={operacion}
                        onChange={(e) => setOperacion(e.target.value)}
                        aria-label="Tipo de operación"
                        className="min-w-0 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#E11D2E]"
                    >
                        <option value="todas">Todas las publicaciones</option>
                        <option value="venta">Comprar</option>
                        <option value="alquiler">Alquilar</option>
                    </select>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#E11D2E] px-7 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                        <Search size={19} />
                        Buscar
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Hero