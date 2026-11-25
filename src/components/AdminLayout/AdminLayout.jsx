
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import AdminSidebar from '../Admin/AdminSidebar/AdminSidebar';
import AdminHeader from '../Admin/AdminHeader/AdminHeader';

const AdminLayout = () => {

    const [menuAbierto, setMenuAbierto] = useState(false);

    useEffect(() => {

        const manejarEscape = (e) => {
            if (e.key === 'Escape') {
                setMenuAbierto(false);
            }
        };

        window.addEventListener('keydown', manejarEscape);

        return () => {
            window.removeEventListener(
                'keydown',
                manejarEscape
            );
        };

    }, []);

    return (
        <div className="min-h-screen bg-[#F4F5F7]">

            {/* Sidebar */}
            <AdminSidebar
                abierto={menuAbierto}
                onCerrar={() => setMenuAbierto(false)}
            />

            {/* Contenido principal */}
            <div className="flex min-h-screen min-w-0 flex-col lg:ml-64">

                {/* Encabezado */}
                <AdminHeader
                    onAbrirMenu={() => setMenuAbierto(true)}
                />

                {/* Contenido dinámico */}
                <main className="min-w-0 flex-1 p-5 md:p-8">

                    <Outlet />

                </main>

                {/* Footer administrativo */}
                <footer className="border-t border-gray-200 bg-white px-5 py-4 text-center text-xs text-gray-500">

                    © {new Date().getFullYear()} AlquilAR.
                    Todos los derechos reservados.

                </footer>

            </div>

        </div>
    );
};

export default AdminLayout;
