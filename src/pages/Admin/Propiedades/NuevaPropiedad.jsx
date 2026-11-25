
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import useAuth from '../../../hooks/useAuth';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

import FormularioPropiedad from '../../../components/Admin/Propiedades/FormularioPropiedad/FormularioPropiedad';

import {
    crearPropiedad
} from '../../../services/propiedades.api';

const NuevaPropiedad = () => {

    useDocumentTitle('Nueva propiedad');

    const navigate = useNavigate();

    const { token, logout } = useAuth();

    const guardarPropiedad = async (datos) => {

        try {

            const propiedad = await crearPropiedad(
                token,
                datos
            );

            navigate('/admin/propiedades', {
                replace: true,
                state: {
                    mensaje: 'Propiedad registrada correctamente',
                    idPropiedad: propiedad.id_propiedad
                }
            });

        } catch (error) {

            if (error.status === 401) {
                logout();
                return;
            }

            throw error;

        }
    };

    return (
        <div className="mx-auto max-w-6xl space-y-6">

            <Link
                to="/admin/propiedades"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#E11D2E]"
            >

                <ArrowLeft size={18} />

                Volver a propiedades

            </Link>

            <div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#E11D2E]">
                    Gestión inmobiliaria
                </span>

                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827]">
                    Nueva propiedad
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Completá los datos para registrar un nuevo inmueble.
                </p>

            </div>

            <FormularioPropiedad
                onGuardar={guardarPropiedad}
            />

        </div>
    );
};

export default NuevaPropiedad;
