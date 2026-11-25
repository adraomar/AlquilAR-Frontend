import React from 'react'
import { Link } from 'react-router-dom';
import {
    House,
    ArrowLeft,
    ShieldCheck,
    KeyRound,
    Building2
} from 'lucide-react';

const AuthLayout = ({ children, titulo, subtitulo }) => {
    return (
        <div className="flex min-h-screen flex-col bg-[#F4F5F7]">

            <header className="bg-[#111827] text-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

                    <Link
                        to="/"
                        className="flex items-center gap-2"
                    >
                        <House
                            size={28}
                            className="text-[#E11D2E]"
                        />

                        <span className="text-2xl font-bold">
                            Alquil
                            <span className="text-[#E11D2E]">
                                AR
                            </span>
                        </span>
                    </Link>

                    <Link
                        to="/"
                        className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
                    >
                        <ArrowLeft size={17} />
                        Volver al inicio
                    </Link>

                </div>
            </header>

            <main className="flex flex-1 items-center justify-center px-4 py-12">

                <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl lg:grid-cols-2">

                    {/* Panel izquierdo */}
                    <aside className="relative hidden flex-col justify-center overflow-hidden bg-[#111827] p-12 text-white lg:flex">

                        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#E11D2E]/10" />

                        <div className="relative z-10">

                            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E11D2E]">
                                <House size={34} />
                            </div>

                            <h2 className="text-4xl font-bold leading-tight">
                                Tu próximo hogar
                                comienza
                                <span className="text-[#E11D2E]">
                                    {' '}acá.
                                </span>
                            </h2>

                            <p className="mt-5 leading-relaxed text-gray-400">
                                Encontrá propiedades y gestioná
                                tus inmuebles desde un mismo lugar.
                            </p>

                            <div className="mt-10 space-y-5">

                                {[
                                    {
                                        icon: Building2,
                                        texto: 'Encontrá tu propiedad ideal'
                                    },
                                    {
                                        icon: KeyRound,
                                        texto: 'Gestioná tus inmuebles'
                                    },
                                    {
                                        icon: ShieldCheck,
                                        texto: 'Acceso seguro a tu cuenta'
                                    }
                                ].map(({ icon: Icon, texto }) => (
                                    <div
                                        key={texto}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="rounded-lg bg-white/10 p-2">
                                            <Icon
                                                size={20}
                                                className="text-[#E11D2E]"
                                            />
                                        </div>

                                        <span className="text-sm text-gray-300">
                                            {texto}
                                        </span>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </aside>

                    {/* Panel del formulario */}
                    <section className="p-6 sm:p-10 lg:p-12">

                        <div className="mb-8">

                            <span className="text-xs font-bold uppercase tracking-widest text-[#E11D2E]">
                                Mi cuenta
                            </span>

                            <h1 className="mt-3 text-3xl font-bold text-[#111827]">
                                {titulo}
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                {subtitulo}
                            </p>

                        </div>

                        {children}

                    </section>

                </div>

            </main>

            <footer className="bg-[#111827] px-5 py-5 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} AlquilAR.
                Todos los derechos reservados.
            </footer>

        </div>
    )
}

export default AuthLayout