import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ rolesPermitidos = [] }) => {
    const location = useLocation();

    const {
        autenticado,
        cargando,
        errorSesion,
        tieneAlgunRol
    } = useAuth();

    // Esperar la validación de la sesión
    if (cargando) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F4F5F7]">
                <LoaderCircle
                    size={36}
                    className="animate-spin text-[#E11D2E]"
                />

                <p className="text-sm font-medium text-gray-500">
                    Verificando sesión...
                </p>
            </div>
        );
    }

    // Error de conexión al verificar la sesión
    if (errorSesion) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F4F5F7] px-5">
                <p className="text-center font-medium text-gray-700">
                    {errorSesion}
                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="rounded-xl bg-[#E11D2E] px-5 py-3 text-sm font-semibold text-white"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    // Usuario no autenticado
    if (!autenticado) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // Usuario sin los roles necesarios
    if (
        rolesPermitidos.length > 0 &&
        !tieneAlgunRol(...rolesPermitidos)
    ) {
        return <Navigate to="/403" replace />;
    }

    // Acceso autorizado
    return <Outlet />;
}

export default ProtectedRoute