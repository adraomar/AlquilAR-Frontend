import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    UserRound,
    ChevronDown,
    LogOut,
    Heart,
    LayoutDashboard,
    Building2,
    House,
    Wrench
} from 'lucide-react';

import useAuth from '../../hooks/useAuth';
import { ROLES, NOMBRES_ROLES } from '../../config/roles';

const UserCP = ({ movil = false, onCerrarMenu }) => {
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const [abierto, setAbierto] = useState(false);

    const {
        usuario,
        autenticado,
        cargando,
        logout,
        tieneRol,
        tieneAlgunRol
    } = useAuth();

    // Cerrar el desplegable al hacer clic fuera
    useEffect(() => {

        const handleClickFuera = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setAbierto(false);
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setAbierto(false);
            }
        };

        document.addEventListener('mousedown', handleClickFuera);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickFuera
            );

            document.removeEventListener(
                'keydown',
                handleEscape
            );
        };

    }, []);

    const cerrarMenu = () => {
        setAbierto(false);
        onCerrarMenu?.();
    };

    const handleLogout = () => {
        logout();
        cerrarMenu();

        navigate('/', {
            replace: true
        });
    };

    if (cargando) {
        return (
            <div
                role="status"
                aria-label="Verificando sesión"
                className="h-11 w-28 animate-pulse rounded-xl bg-white/10"
            />
        );
    }

    // Usuario sin sesión
    if (!autenticado) {
        return (
            <Link
                to="/login"
                onClick={cerrarMenu}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-600 px-4 py-2.5 text-sm font-medium text-white transition hover:border-[#E11D2E] hover:bg-white/5"
            >
                <UserRound size={18} />
                Mi cuenta
            </Link>
        );
    }

    // Iniciales del usuario
    const iniciales = (
        `${usuario.nombre?.charAt(0) || ''}${usuario.apellido?.charAt(0) || ''}`
    ).toUpperCase();

    // Opciones disponibles según los roles
    const opciones = [
        {
            nombre: 'Mi perfil',
            icon: UserRound,
            ruta: '/mi-perfil',
            visible: true
        },
        {
            nombre: 'Mis favoritos',
            icon: Heart,
            ruta: '/mis-favoritos',
            visible: true
        },
        {
            nombre: 'Panel de administración',
            icon: LayoutDashboard,
            ruta: '/admin',
            visible: tieneRol(ROLES.ADMIN_SISTEMA)
        },
        {
            nombre: 'Gestión inmobiliaria',
            icon: Building2,
            ruta: '/admin/propiedades',
            visible: tieneAlgunRol(
                ROLES.ADMIN_SISTEMA,
                ROLES.ADMIN_INMOBILIARIA
            )
        },
        {
            nombre: 'Gestión de consorcios',
            icon: Building2,
            ruta: '/consorcios',
            visible: tieneAlgunRol(
                ROLES.ADMIN_SISTEMA,
                ROLES.ADMIN_CONSORCIO
            )
        },
        {
            nombre: 'Mis inmuebles',
            icon: House,
            ruta: '/mis-inmuebles',
            visible: tieneRol(ROLES.RESIDENTE)
        },
        {
            nombre: 'Mis tickets',
            icon: Wrench,
            ruta: '/tecnico/tickets',
            visible: tieneRol(ROLES.TECNICO)
        }
    ];

    return (
        <div
            ref={menuRef}
            className={`relative ${movil ? 'w-full' : ''}`}
        >

            {/* Botón del usuario */}
            <button
                type="button"
                onClick={() => setAbierto(prev => !prev)}
                aria-expanded={abierto}
                className={`
                    flex items-center gap-3 rounded-xl
                    border border-gray-600 px-3 py-2
                    text-sm font-medium text-white
                    transition hover:border-[#E11D2E]
                    hover:bg-white/5
                    ${movil ? 'w-full' : ''}
                `}
            >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E11D2E] text-xs font-bold text-white">
                    {iniciales}
                </div>

                <span className="max-w-28 truncate">
                    {usuario.nombre}
                </span>

                <ChevronDown
                    size={16}
                    className={`
                        ml-auto shrink-0 transition-transform
                        ${abierto ? 'rotate-180' : ''}
                    `}
                />
            </button>

            {/* Menú desplegable */}
            {abierto && (
                <div
                    className={`
                        z-50 overflow-hidden rounded-2xl
                        border border-gray-200 bg-white shadow-xl
                        ${movil
                            ? 'mt-3 w-full'
                            : 'absolute right-0 top-full mt-3 w-72'
                        }
                    `}
                >

                    {/* Información del usuario */}
                    <div className="border-b border-gray-100 bg-[#F4F5F7] p-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-[#E11D2E]">
                                {iniciales}
                            </div>

                            <div className="min-w-0">

                                <p className="truncate text-sm font-bold text-[#111827]">
                                    {usuario.nombre} {usuario.apellido}
                                </p>

                                <p className="truncate text-xs text-gray-500">
                                    {usuario.email}
                                </p>

                            </div>

                        </div>

                        {/* Roles asignados */}
                        <div className="mt-3 flex flex-wrap gap-1.5">

                            {usuario.roles?.map(rol => (
                                <span
                                    key={rol}
                                    className="rounded-md bg-gray-200 px-2 py-1 text-[10px] font-semibold text-gray-700"
                                >
                                    {NOMBRES_ROLES[rol] || rol}
                                </span>
                            ))}

                        </div>

                    </div>

                    {/* Opciones de navegación */}
                    <div className="p-2">

                        {opciones
                            .filter(opcion => opcion.visible)
                            .map(({ nombre, icon: Icon, ruta }) => (
                                <Link
                                    key={ruta}
                                    to={ruta}
                                    onClick={cerrarMenu}
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-[#E11D2E]"
                                >
                                    <Icon
                                        size={18}
                                        className="shrink-0"
                                    />

                                    {nombre}
                                </Link>
                            ))
                        }

                    </div>

                    {/* Cerrar sesión */}
                    <div className="border-t border-gray-100 p-2">

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-[#E11D2E] transition hover:bg-red-50"
                        >
                            <LogOut size={18} />
                            Cerrar sesión
                        </button>

                    </div>

                </div>
            )}

        </div>
    )
}

export default UserCP