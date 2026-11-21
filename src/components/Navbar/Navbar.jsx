
import React, { useState } from 'react';
import {
    House,
    Menu,
    X,
    Search,
    ArrowRight
} from 'lucide-react';

const Navbar = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const enlaces = [
        { nombre: 'Inicio', href: '#inicio' },
        { nombre: 'Propiedades', href: '#propiedades' },
        { nombre: 'Nosotros', href: '#nosotros' },
        { nombre: 'Contacto', href: '#contacto' }
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111827] shadow-lg">

            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

                {/* Logo */}
                <a
                    href="#inicio"
                    className="flex items-center gap-2"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E11D2E] shadow-md shadow-red-900/20">
                        <House
                            size={22}
                            className="text-white"
                            strokeWidth={2.5}
                        />
                    </div>

                    <span className="text-2xl font-extrabold tracking-tight text-white">
                        Alquil
                        <span className="text-[#E11D2E]">
                            AR
                        </span>
                    </span>
                </a>

                {/* Navegación escritorio */}
                <div className="hidden items-center gap-9 lg:flex">
                    {enlaces.map((enlace) => (
                        <a
                            key={enlace.nombre}
                            href={enlace.href}
                            className="relative text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-[#E11D2E] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {enlace.nombre}
                        </a>
                    ))}
                </div>

                {/* Acciones escritorio */}
                <div className="hidden items-center gap-4 lg:flex">

                    {/* Buscar */}
                    <a
                        href="#propiedades"
                        aria-label="Buscar propiedades"
                        className="rounded-full p-2 text-gray-300 transition-all hover:bg-white/10 hover:text-white"
                    >
                        <Search size={20} />
                    </a>

                    {/* Contacto */}
                    <a
                        href="#contacto"
                        className="flex items-center gap-2 rounded-xl bg-[#E11D2E] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-900/30"
                    >
                        Contactanos
                        <ArrowRight size={16} />
                    </a>
                </div>

                {/* Botón móvil */}
                <button
                    type="button"
                    className="rounded-lg p-2 text-white transition hover:bg-white/10 lg:hidden"
                    aria-label={
                        menuAbierto ? 'Cerrar menú' : 'Abrir menú'
                    }
                    aria-expanded={menuAbierto}
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    {menuAbierto ? (
                        <X size={26} />
                    ) : (
                        <Menu size={26} />
                    )}
                </button>
            </nav>

            {/* Menú móvil */}
            {menuAbierto && (
                <div className="border-t border-white/10 bg-[#111827] px-6 py-6 shadow-xl lg:hidden">
                    <div className="flex flex-col gap-5">

                        {enlaces.map((enlace) => (
                            <a
                                key={enlace.nombre}
                                href={enlace.href}
                                onClick={() => setMenuAbierto(false)}
                                className="border-b border-white/10 pb-3 text-sm font-semibold text-gray-300 transition-colors hover:text-[#E11D2E]"
                            >
                                {enlace.nombre}
                            </a>
                        ))}

                        <a
                            href="#contacto"
                            onClick={() => setMenuAbierto(false)}
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#E11D2E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            Contactanos
                            <ArrowRight size={17} />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
