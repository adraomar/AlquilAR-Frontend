
import { Link } from 'react-router-dom';

import {
    Building2,
    ClipboardList,
    ArrowRight
} from 'lucide-react';

import useAuth from '../../hooks/useAuth';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Dashboard = () => {

    useDocumentTitle('Panel administrativo');

    const { usuario } = useAuth();

    return (
        <div className="space-y-8">

            {/* Encabezado */}
            <div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#E11D2E]">
                    Administración
                </span>

                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827]">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Bienvenido al panel de gestión inmobiliaria.
                </p>

            </div>

            {/* Bienvenida */}
            <section className="relative overflow-hidden rounded-2xl bg-[#111827] p-8 text-white shadow-sm">

                <div className="relative z-10">

                    <p className="text-sm font-medium text-gray-400">
                        Panel de control
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        ¡Hola, {usuario?.nombre}!
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300">
                        Desde este espacio podrás administrar las
                        propiedades y publicaciones de AlquilAR.
                    </p>

                </div>

                <Building2
                    size={180}
                    strokeWidth={0.8}
                    className="absolute -bottom-8 right-4 text-white/5"
                />

            </section>

            {/* Accesos rápidos */}
            <section>

                <h2 className="mb-5 text-xl font-bold text-[#111827]">
                    Accesos rápidos
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                    <Link
                        to="/admin/propiedades"
                        className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Building2 size={25} />
                        </div>

                        <h3 className="text-lg font-bold text-[#111827]">
                            Gestionar propiedades
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Registrá, editá y administrá los inmuebles.
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#E11D2E]">
                            Ir a propiedades

                            <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </div>

                    </Link>

                    <Link
                        to="/admin/publicaciones"
                        className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                            <ClipboardList size={25} />
                        </div>

                        <h3 className="text-lg font-bold text-[#111827]">
                            Gestionar publicaciones
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Administrá las operaciones de venta y alquiler.
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#E11D2E]">
                            Ir a publicaciones

                            <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </div>

                    </Link>

                </div>

            </section>

        </div>
    );
};

export default Dashboard;
