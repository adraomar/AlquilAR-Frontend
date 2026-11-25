
import { Link } from 'react-router-dom';
import { Menu, ChevronRight } from 'lucide-react';

import useAuth from '../../../hooks/useAuth';
import { ROLES, NOMBRES_ROLES } from '../../../config/roles';

const AdminHeader = ({ onAbrirMenu }) => {

    const { usuario, tieneRol } = useAuth();

    const iniciales = (
        `${usuario?.nombre?.charAt(0) || ''}${usuario?.apellido?.charAt(0) || ''}`
    ).toUpperCase();

    const rolPrincipal = tieneRol(ROLES.ADMIN_SISTEMA)
        ? ROLES.ADMIN_SISTEMA
        : ROLES.ADMIN_INMOBILIARIA;

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-gray-200 bg-white px-5 shadow-sm lg:px-8">

            {/* Sector izquierdo */}
            <div className="flex min-w-0 items-center gap-4">

                <button
                    type="button"
                    onClick={onAbrirMenu}
                    aria-label="Abrir menú administrativo"
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-100 lg:hidden"
                >
                    <Menu size={22} />
                </button>

                <div className="min-w-0">

                    <p className="truncate text-sm font-bold text-[#111827]">
                        Panel administrativo
                    </p>

                    <div className="mt-1 hidden items-center gap-1 text-xs text-gray-500 sm:flex">

                        <Link
                            to="/"
                            className="transition hover:text-[#E11D2E]"
                        >
                            AlquilAR
                        </Link>

                        <ChevronRight size={13} />

                        <span>Gestión inmobiliaria</span>

                    </div>

                </div>

            </div>

            {/* Información del usuario */}
            <Link
                to="/mi-perfil"
                className="flex shrink-0 items-center gap-3 rounded-xl p-2 transition hover:bg-gray-100"
            >

                <div className="hidden text-right sm:block">

                    <p className="text-sm font-bold text-[#111827]">
                        {usuario?.nombre} {usuario?.apellido}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                        {NOMBRES_ROLES[rolPrincipal]}
                    </p>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-[#E11D2E]">
                    {iniciales}
                </div>

            </Link>

        </header>
    );
};

export default AdminHeader;
