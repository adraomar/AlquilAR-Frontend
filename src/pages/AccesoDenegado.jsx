import React from 'react'
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, House } from 'lucide-react';

const AccesoDenegado = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F4F5F7] px-5 py-12">

            <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl">

                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">

                    <ShieldAlert
                        size={48}
                        className="text-[#E11D2E]"
                    />

                </div>

                <span className="text-6xl font-extrabold text-[#E11D2E]">
                    403
                </span>

                <h1 className="mt-4 text-3xl font-bold text-[#111827]">
                    Acceso denegado
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                    No tenés los permisos necesarios para
                    acceder a esta sección de AlquilAR.
                </p>

                <Link
                    to="/"
                    className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#E11D2E] px-5 py-4 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                    <ArrowLeft size={18} />
                    Volver al inicio
                </Link>

                <div className="mt-8 flex items-center justify-center gap-2 border-t border-gray-100 pt-6">

                    <House
                        size={20}
                        className="text-[#E11D2E]"
                    />

                    <span className="text-lg font-bold text-[#111827]">
                        Alquil
                        <span className="text-[#E11D2E]">
                            AR
                        </span>
                    </span>

                </div>

            </div>

        </main>
    )
}

export default AccesoDenegado