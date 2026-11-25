import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Paginacion = ({
    paginaActual,
    totalPaginas,
    totalResultados,
    elementosPorPagina,
    onCambiarPagina
}) => {
    if (totalPaginas <= 1) return null;

    const desde = (paginaActual - 1) * elementosPorPagina + 1;

    const hasta = Math.min(
        paginaActual * elementosPorPagina,
        totalResultados
    );

    return (
        <nav
            aria-label="Paginación"
            className="mt-10 flex flex-col items-center gap-4 border-t border-gray-200 pt-6"
        >

            {/* Información de resultados */}
            <p className="text-sm text-gray-500">
                Mostrando{' '}
                <span className="font-semibold text-[#111827]">
                    {desde} - {hasta}
                </span>
                {' '}de{' '}
                <span className="font-semibold text-[#111827]">
                    {totalResultados}
                </span>
                {' '}propiedades
            </p>

            {/* Botones */}
            <div className="flex flex-wrap items-center justify-center gap-2">

                {/* Página anterior */}
                <button
                    type="button"
                    aria-label="Página anterior"
                    disabled={paginaActual === 1}
                    onClick={() => onCambiarPagina(paginaActual - 1)}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:border-gray-400 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Números de página */}
                {Array.from(
                    { length: totalPaginas },
                    (_, index) => index + 1
                ).map((pagina) => (

                    <button
                        key={pagina}
                        type="button"
                        aria-label={`Página ${pagina}`}
                        aria-current={
                            paginaActual === pagina
                                ? 'page'
                                : undefined
                        }
                        onClick={() => onCambiarPagina(pagina)}
                        className={`
                            flex h-10 w-10 cursor-pointer
                            items-center justify-center rounded-lg
                            border text-sm font-semibold transition
                            ${paginaActual === pagina
                                ? 'border-[#E11D2E] bg-[#E11D2E] text-white shadow-sm'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-100'
                            }
                        `}
                    >
                        {pagina}
                    </button>

                ))}

                {/* Página siguiente */}
                <button
                    type="button"
                    aria-label="Página siguiente"
                    disabled={paginaActual === totalPaginas}
                    onClick={() => onCambiarPagina(paginaActual + 1)}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:border-gray-400 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronRight size={20} />
                </button>

            </div>

        </nav>
    )
}

export default Paginacion