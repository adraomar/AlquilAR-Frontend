import React from 'react'

const colores = {
    azul: 'bg-blue-50 text-blue-600',
    verde: 'bg-green-50 text-green-700',
    violeta: 'bg-violet-50 text-violet-600',
    rojo: 'bg-red-50 text-[#E11D2E]',
    naranja: 'bg-orange-50 text-orange-600'
};

const StatCard = ({
    titulo,
    valor,
    descripcion,
    icon: Icon,
    color = 'azul'
}) => {
    return (
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-center justify-between gap-4">

                <div className="min-w-0">

                    <p className="text-sm font-medium text-gray-500">
                        {titulo}
                    </p>

                    <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827]">
                        {Number(valor).toLocaleString('es-AR')}
                    </h3>

                </div>

                <div className={`
                    flex h-14 w-14 shrink-0 items-center
                    justify-center rounded-2xl
                    ${colores[color] || colores.azul}
                `}>
                    <Icon size={26} />
                </div>

            </div>

            <div className="mt-5 border-t border-gray-100 pt-4">

                <p className="text-xs font-medium text-gray-500">
                    {descripcion}
                </p>

            </div>

        </article>
    )
}

export default StatCard