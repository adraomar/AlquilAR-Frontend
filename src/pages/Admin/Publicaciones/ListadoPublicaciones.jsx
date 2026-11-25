
import { ClipboardList } from 'lucide-react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const ListadoPublicaciones = () => {

    useDocumentTitle('Gestión de publicaciones');

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-extrabold text-[#111827]">
                    Publicaciones
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Administrá las propiedades publicadas en el catálogo.
                </p>
            </div>

            <section className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-16 text-center shadow-sm">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <ClipboardList size={32} />
                </div>

                <h2 className="text-xl font-bold text-[#111827]">
                    Gestión de publicaciones
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Módulo en desarrollo.
                </p>

            </section>

        </div>
    );
};

export default ListadoPublicaciones;
