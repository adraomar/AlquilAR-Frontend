import { Link, NavLink, useNavigate } from 'react-router-dom';

import {
    House,
    LayoutDashboard,
    Building2,
    ClipboardList,
    CalendarDays,
    Users,
    ExternalLink,
    LogOut,
    X
} from 'lucide-react';

import useAuth from '../../../hooks/useAuth';

const AdminSidebar = ({ abierto, onCerrar }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const opciones = [
        {
            nombre: 'Dashboard',
            ruta: '/admin',
            icon: LayoutDashboard,
            end: true
        },
        {
            nombre: 'Propiedades',
            ruta: '/admin/propiedades',
            icon: Building2
        },
        {
            nombre: 'Publicaciones',
            ruta: '/admin/publicaciones',
            icon: ClipboardList
        },
        {
            nombre: 'Visitas',
            icon: CalendarDays,
            pendiente: true
        },
        {
            nombre: 'Clientes',
            icon: Users,
            pendiente: true
        }
    ];

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <>
            {/* Fondo oscuro en dispositivos móviles */}
            {abierto && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={onCerrar}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex h-dvh w-64 flex-col
                    bg-[#111827] text-white
                    transition-transform duration-300
                    lg:translate-x-0
                    ${abierto
                        ? 'translate-x-0'
                        : '-translate-x-full'
                    }
                `}
            >

                {/* Logo */}
                <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6">

                    <Link
                        to="/admin"
                        onClick={onCerrar}
                        className="flex items-center gap-2"
                    >
                        <House
                            size={30}
                            className="text-[#E11D2E]"
                        />

                        <span className="text-2xl font-extrabold tracking-tight">
                            Alquil
                            <span className="text-[#E11D2E]">
                                AR
                            </span>
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={onCerrar}
                        aria-label="Cerrar menú"
                        className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Navegación */}
                <nav className="flex-1 overflow-y-auto px-4 py-6">

                    <p className="mb-4 px-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">
                        Gestión inmobiliaria
                    </p>

                    <div className="space-y-2">

                        {opciones.map((opcion) => {

                            const Icon = opcion.icon;

                            if (opcion.pendiente) {
                                return (
                                    <div
                                        key={opcion.nombre}
                                        className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-500"
                                    >
                                        <Icon size={20} />

                                        <span>
                                            {opcion.nombre}
                                        </span>

                                        <span className="ml-auto rounded bg-white/5 px-1.5 py-1 text-[9px]">
                                            Próx.
                                        </span>
                                    </div>
                                );
                            }

                            return (
                                <NavLink
                                    key={opcion.ruta}
                                    to={opcion.ruta}
                                    end={opcion.end}
                                    onClick={onCerrar}
                                    className={({ isActive }) => `
                                        flex items-center gap-3
                                        rounded-xl px-3 py-3
                                        text-sm font-medium
                                        transition-all duration-200
                                        ${isActive
                                            ? 'bg-[#E11D2E] text-white shadow-lg'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }
                                    `}
                                >
                                    <Icon size={20} />
                                    {opcion.nombre}
                                </NavLink>
                            );
                        })}

                    </div>

                </nav>

                {/* Acciones inferiores */}
                <div className="space-y-2 border-t border-white/10 p-4">

                    <Link
                        to="/"
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <ExternalLink size={19} />
                        Ver catálogo
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                        <LogOut size={19} />
                        Cerrar sesión
                    </button>

                </div>

                <div className="border-t border-white/10 px-6 py-4">
                    <p className="text-xs text-gray-500">
                        AlquilAR · Panel administrativo
                    </p>
                </div>

            </aside>
        </>
    )
}

export default AdminSidebar