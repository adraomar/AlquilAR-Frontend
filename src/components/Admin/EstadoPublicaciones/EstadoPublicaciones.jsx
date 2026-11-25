import React from 'react'

const EstadoPublicaciones = ({ publicaciones }) => {
    const total = publicaciones.total;

    const estados = [
        {
            nombre: 'Publicadas',
            cantidad: publicaciones.publicadas,
            color: '#16A34A'
        },
        {
            nombre: 'Pausadas',
            cantidad: publicaciones.pausadas,
            color: '#F59E0B'
        },
        {
            nombre: 'Borradores',
            cantidad: publicaciones.borradores,
            color: '#94A3B8'
        },
        {
            nombre: 'Finalizadas',
            cantidad: publicaciones.finalizadas,
            color: '#64748B'
        }
    ];

    let acumulado = 0;

    const segmentos = estados.map(estado => {

        const porcentaje = total > 0
            ? (estado.cantidad / total) * 100
            : 0;

        const inicio = acumulado;

        acumulado += porcentaje;

        return `${estado.color} ${inicio}% ${acumulado}%`;
    });

    const fondo = total > 0
        ? `conic-gradient(${segmentos.join(', ')})`
        : '#E5E7EB';

    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-[#111827]">
                Estado de publicaciones
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                Distribución por estado
            </p>

            {/* Gráfico circular */}
            <div className="flex justify-center py-8">

                <div
                    aria-hidden="true"
                    className="relative flex h-48 w-48 items-center justify-center rounded-full"
                    style={{ background: fondo }}
                >

                    <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">

                        <span className="text-4xl font-extrabold text-[#111827]">
                            {total}
                        </span>

                        <span className="mt-1 text-xs text-gray-500">
                            Publicaciones
                        </span>

                    </div>

                </div>

            </div>

            {/* Referencias */}
            <div className="space-y-4">

                {estados.map(estado => {

                    const porcentaje = total > 0
                        ? (estado.cantidad / total) * 100
                        : 0;

                    return (
                        <div
                            key={estado.nombre}
                            className="flex items-center gap-3"
                        >

                            <span
                                className="h-3 w-3 shrink-0 rounded-full"
                                style={{
                                    backgroundColor: estado.color
                                }}
                            />

                            <span className="flex-1 text-sm font-medium text-gray-600">
                                {estado.nombre}
                            </span>

                            <span className="text-sm font-bold text-[#111827]">
                                {estado.cantidad}
                            </span>

                            <span className="w-14 text-right text-xs text-gray-500">
                                {porcentaje.toLocaleString('es-AR', {
                                    maximumFractionDigits: 1
                                })}%
                            </span>

                        </div>
                    );
                })}

            </div>

            {publicaciones.publicadas_no_visibles > 0 && (
                <div className="mt-6 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
                    Hay {publicaciones.publicadas_no_visibles}{' '}
                    publicaciones que no aparecen en el catálogo
                    porque sus propiedades están inactivas.
                </div>
            )}

        </section>
    )
}

export default EstadoPublicaciones