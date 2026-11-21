import React, { useState, useEffect } from 'react'
import {
    House,
    ChevronLeft,
    ChevronRight,
    Images
} from 'lucide-react';

const API_URL = 'http://localhost:3000';

const PropiedadGaleria = ({ imagenes = [], titulo }) => {
    const [indiceActivo, setIndiceActivo] = useState(0);

    useEffect(() => {
        setIndiceActivo(0);
    }, [imagenes]);

    const obtenerUrl = (ruta) => `${API_URL}${ruta}`;
    const anterior = () => {
        setIndiceActivo((actual) =>
            (actual - 1 + imagenes.length) % imagenes.length
        );
    };

    const siguiente = () => {
        setIndiceActivo((actual) =>
            (actual + 1) % imagenes.length
        );
    };

    if (imagenes.length === 0) {
        return (
            <div className="flex h-72 flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-[#F4F5F7] text-gray-400 md:h-[460px]">
                <House size={60} strokeWidth={1.2} />

                <p className="text-sm font-medium">
                    Esta propiedad todavía no tiene fotografías
                </p>
            </div>
        );
    }

    const imagenActual = imagenes[indiceActivo];

    return (
        <div className="space-y-4">

            {/* Imagen principal */}
            <div className="group relative h-72 overflow-hidden rounded-2xl bg-gray-100 md:h-[460px]">

                <img
                    src={obtenerUrl(imagenActual.ruta_archivo)}
                    alt={`${titulo} - fotografía ${indiceActivo + 1}`}
                    className="h-full w-full object-cover"
                />

                {/* Contador */}
                <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-[#111827]/85 px-4 py-2 text-xs font-semibold text-white">
                    <Images size={15} />
                    {indiceActivo + 1} / {imagenes.length}
                </div>

                {/* Navegación */}
                {imagenes.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={anterior}
                            aria-label="Fotografía anterior"
                            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111827] shadow-md transition hover:bg-white"
                        >
                            <ChevronLeft size={23} />
                        </button>

                        <button
                            type="button"
                            onClick={siguiente}
                            aria-label="Fotografía siguiente"
                            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111827] shadow-md transition hover:bg-white"
                        >
                            <ChevronRight size={23} />
                        </button>
                    </>
                )}
            </div>

            {/* Miniaturas */}
            {imagenes.length > 1 && (
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
                    {imagenes.map((imagen, index) => (
                        <button
                            key={imagen.id_imagen}
                            type="button"
                            onClick={() => setIndiceActivo(index)}
                            aria-label={`Ver fotografía ${index + 1}`}
                            aria-pressed={indiceActivo === index}
                            className={`h-20 overflow-hidden rounded-xl border-2 transition ${indiceActivo === index
                                    ? 'border-[#E11D2E]'
                                    : 'border-transparent hover:border-gray-300'
                                }`}
                        >
                            <img
                                src={obtenerUrl(imagen.ruta_archivo)}
                                alt={`${titulo} - miniatura ${index + 1}`}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PropiedadGaleria