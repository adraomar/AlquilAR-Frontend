import { Navigate, Outlet } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const PublicRoute = () => {
    const { autenticado, cargando } = useAuth();

    if (cargando) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F4F5F7]">
                <LoaderCircle
                    size={36}
                    className="animate-spin text-[#E11D2E]"
                />
            </div>
        );
    }

    if (autenticado) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default PublicRoute