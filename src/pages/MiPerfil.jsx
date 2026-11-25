
import { Link } from 'react-router-dom';
import { ChevronRight, House } from 'lucide-react';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

import PerfilResumen from '../components/Perfil/PerfilResumen';
import PerfilDatos from '../components/Perfil/PerfilDatos';
import PerfilSeguridad from '../components/Perfil/PerfilSeguridad';
import useDocumentTitle from '../hooks/useDocumentTitle';

const MiPerfil = () => {
    useDocumentTitle('Mi Perfil');
    return (
        <div className="flex min-h-screen flex-col bg-[#F4F5F7]">

            <Navbar />

            <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 lg:px-8 lg:py-14">

                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">

                    <Link
                        to="/"
                        className="flex items-center gap-2 transition hover:text-[#E11D2E]"
                    >
                        <House size={16} />
                        Inicio
                    </Link>

                    <ChevronRight size={16} />

                    <span className="font-medium text-[#111827]">
                        Mi perfil
                    </span>

                </div>

                {/* Encabezado */}
                <div className="mb-8">

                    <span className="text-xs font-bold uppercase tracking-widest text-[#E11D2E]">
                        Mi cuenta
                    </span>

                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
                        Mi perfil
                    </h1>

                    <p className="mt-3 text-sm text-gray-500 sm:text-base">
                        Administrá tu información personal y la seguridad
                        de tu cuenta en AlquilAR.
                    </p>

                </div>

                {/* Componentes del perfil */}
                <div className="space-y-6">

                    <PerfilResumen />

                    <PerfilDatos />

                    <PerfilSeguridad />

                </div>

            </main>

            <Footer />

        </div>
    );
};

export default MiPerfil;
