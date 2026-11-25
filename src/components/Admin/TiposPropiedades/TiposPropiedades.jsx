import React from 'react'
import {
    House,
    Building2,
    Map,
    Store,
    Layers
} from 'lucide-react';

const configuracionTipos = {
    casa: {
        nombre: 'Casas',
        icon: House,
        color: '#E11D2E'
    },
    departamento: {
        nombre: 'Departamentos',
        icon: Building2,
        color: '#2563EB'
    },
    terreno: {
        nombre: 'Terrenos',
        icon: Map,
        color: '#16A34A'
    },
    local: {
        nombre: 'Locales',
        icon: Store,
        color: '#D97706'
    },
    otro: {
        nombre: 'Otros',
        icon: Layers,
        color: '#64748B'
    }
};

const TiposPropiedades = ({ tipos }) => {
    const total = tipos.reduce(
        (acumulado, item) => acumulado + item.cantidad,
        0
    );

    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-[#111827]">
                Tipos de propiedades
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                Distribución de inmuebles activos
            </p>

            <div className="mt-8 space-y-7">

                {tipos.map(item => {

                    const config = configuracionTipos[item.tipo]
                        || configuracionTipos.otro;

                    const Icon = config.icon;

                    const porcentaje = total > 0
                        ? (item.cantidad / total) * 100
                        : 0;

                    return (
                        <div key={item.tipo}>

                            <div className="mb-3 flex items-center gap-3">

                                <Icon
                                    size={19}
                                    style={{ color: config.color }}
                                />

                                <span className="flex-1 text-sm font-medium text-gray-700">
                                    {config.nombre}
                                </span>

                                <span className="text-sm font-bold text-[#111827]">
                                    {item.cantidad}
                                </span>

                                <span className="w-14 text-right text-xs text-gray-500">
                                    {porcentaje.toLocaleString('es-AR', {
                                        maximumFractionDigits: 1
                                    })}%
                                </span>

                            </div>

                            <div
                                aria-hidden="true"
                                className="h-2.5 overflow-hidden rounded-full bg-gray-100"
                            >

                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{
                                        width: `${porcentaje}%`,
                                        backgroundColor: config.color
                                    }}
                                />

                            </div>

                        </div>
                    );
                })}

            </div>

            <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">

                <span className="text-sm text-gray-500">
                    Total de propiedades activas
                </span>

                <span className="text-lg font-bold text-[#111827]">
                    {total}
                </span>

            </div>

        </section>
    )
}

export default TiposPropiedades