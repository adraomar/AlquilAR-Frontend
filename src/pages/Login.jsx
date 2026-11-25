import React, { useState } from 'react';
import {
    Mail,
    Lock,
    ArrowRight,
    LoaderCircle,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import AuthInput from '../components/AuthInput/AuthInput';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import useAuth from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formulario, setFormulario] = useState({
        email: '',
        password: ''
    });

    const [errores, setErrores] = useState({});
    const [error, setError] = useState('');
    const [exito, setExito] = useState(location.state?.mensaje || '');
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormulario(prev => ({
            ...prev,
            [name]: value
        }));

        setErrores(prev => ({
            ...prev,
            [name]: ''
        }));

        setError('');
        setExito('');
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formulario.email.trim()) {
            nuevosErrores.email = 'Ingresá tu correo electrónico';
        } else if (!emailRegex.test(formulario.email.trim())) {
            nuevosErrores.email = 'Ingresá un correo válido';
        }

        if (!formulario.password) {
            nuevosErrores.password = 'Ingresá tu contraseña';
        }

        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (cargando) return;

        setError('');
        setExito('');

        if (!validarFormulario()) return;

        try {

            setCargando(true);

            await login({
                email: formulario.email.trim(),
                password: formulario.password
            });

            const destino = location.state?.from;

            navigate(
                destino
                    ? `${destino.pathname}${destino.search || ''}${destino.hash || ''}`
                    : '/',
                { replace: true }
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setCargando(false);

        }
    };

    useDocumentTitle('Iniciar Sesion');

    return (
        <AuthLayout
            titulo="Bienvenido de nuevo"
            subtitulo="Ingresá tus credenciales para acceder a tu cuenta."
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
            >

                {error && (
                    <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <AlertCircle size={20} className="shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {exito && (
                    <div role="status" className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                        <CheckCircle size={20} className="shrink-0" />
                        <span>{exito}</span>
                    </div>
                )}

                <AuthInput
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    value={formulario.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    icon={Mail}
                    error={errores.email}
                    autoComplete="email"
                    required
                />

                <AuthInput
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={formulario.password}
                    onChange={handleChange}
                    placeholder="Ingresá tu contraseña"
                    icon={Lock}
                    error={errores.password}
                    autoComplete="current-password"
                    required
                />

                <button
                    type="submit"
                    disabled={cargando}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E11D2E] px-5 py-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {cargando ? (
                        <>
                            <LoaderCircle
                                size={20}
                                className="animate-spin"
                            />
                            Iniciando sesión...
                        </>
                    ) : (
                        <>
                            Iniciar sesión
                            <ArrowRight size={19} />
                        </>
                    )}
                </button>

            </form>

            <div className="mt-8 border-t border-gray-100 pt-6 text-center">

                <p className="text-sm text-gray-500">
                    ¿Todavía no tenés una cuenta?{' '}

                    <Link
                        to="/registro"
                        className="font-semibold text-[#E11D2E] hover:underline"
                    >
                        Registrate
                    </Link>
                </p>

            </div>

        </AuthLayout>
    )
}

export default Login