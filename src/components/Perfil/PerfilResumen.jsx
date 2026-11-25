import React from 'react'
import { ShieldCheck, CalendarDays, Clock } from 'lucide-react';
import useAuth from '../../hooks/useAuth.js';
import { NOMBRES_ROLES } from '../../config/roles.js';

const PerfilResumen = () => {
    const { usuario } = useAuth();
    const iniciales = (
        `${usuario.nombre?.charAt(0) || ''}${usuario.apellido?.charAt(0) || ''}`
    ).toUpperCase();

    const formatearFecha = (fecha) => {

        if (!fecha) return 'Sin información';

        return new Date(fecha).toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-red-100 text-3xl font-bold text-[#E11D2E]">
                    {iniciales}
                </div>

                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold text-[#111827]">
                        {usuario.nombre} {usuario.apellido}
                    </h2>
                    <p className="mt-1 break-all text-sm text-gray-500">
                        {usuario.email}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {usuario.roles?.map(rol => (
                            <span
                                key={rol}
                                className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-[#E11D2E]"
                            >
                                {NOMBRES_ROLES[rol] || rol}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                    <ShieldCheck size={20} />
                    Cuenta activa
                </div>
            </div>

            <div className="mt-6 grid gap-5 border-t border-gray-100 pt-6 sm:grid-cols-2">
                <div className="flex items-center gap-3">

                    <CalendarDays
                        size={22}
                        className="text-gray-400"
                    />

                    <div>
                        <p className="text-xs text-gray-500">
                            Miembro desde
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#111827]">
                            {formatearFecha(usuario.created_at)}
                        </p>
                    </div>

                </div>
                <div className="flex items-center gap-3">

                    <Clock
                        size={22}
                        className="text-gray-400"
                    />
                    <div>
                        <p className="text-xs text-gray-500">
                            Último acceso
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#111827]">
                            {formatearFecha(usuario.ultimo_acceso)}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PerfilResumen