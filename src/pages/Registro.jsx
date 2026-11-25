import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    User,
    Mail,
    Phone,
    Lock,
    UserPlus,
    LoaderCircle,
    AlertCircle
} from 'lucide-react';

import AuthLayout from '../components/AuthLayout/AuthLayout';
import AuthInput from '../components/AuthInput/AuthInput';
import { registrarUsuario } from '../services/auth.api.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const Registro = () => {
    const navigate = useNavigate();

    const [formulario, setFormulario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        confirmarPassword: ''
    });

    const [errores, setErrores] = useState({});
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormulario(prev => ({
            ...prev,
            [name]: value
        }));

        setErrores(prev => ({
            ...prev,
            [name]: '',
            ...(name === 'password'
                ? { confirmarPassword: '' }
                : {})
        }));

        setError('');
    };

    const validarFormulario = () => {

        const nuevosErrores = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formulario.nombre.trim()) {
            nuevosErrores.nombre = 'Ingresá tu nombre';
        } else if (formulario.nombre.trim().length > 100) {
            nuevosErrores.nombre = 'Máximo 100 caracteres';
        }

        if (!formulario.apellido.trim()) {
            nuevosErrores.apellido = 'Ingresá tu apellido';
        } else if (formulario.apellido.trim().length > 100) {
            nuevosErrores.apellido = 'Máximo 100 caracteres';
        }

        if (!formulario.email.trim()) {
            nuevosErrores.email = 'Ingresá tu correo electrónico';
        } else if (!emailRegex.test(formulario.email.trim())) {
            nuevosErrores.email = 'Ingresá un correo válido';
        } else if (formulario.email.trim().length > 150) {
            nuevosErrores.email = 'Máximo 150 caracteres';
        }

        if (formulario.telefono.trim().length > 30) {
            nuevosErrores.telefono = 'Máximo 30 caracteres';
        }

        if (formulario.password.length < 8) {
            nuevosErrores.password =
                'La contraseña debe tener al menos 8 caracteres';
        } else if (
            new TextEncoder().encode(formulario.password).length > 72
        ) {
            nuevosErrores.password =
                'La contraseña no puede superar los 72 bytes';
        }

        if (!formulario.confirmarPassword) {
            nuevosErrores.confirmarPassword =
                'Confirmá tu contraseña';
        } else if (
            formulario.password !== formulario.confirmarPassword
        ) {
            nuevosErrores.confirmarPassword =
                'Las contraseñas no coinciden';
        }

        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cargando) return;

        setError('');

        if (!validarFormulario()) return;

        try {
            setCargando(true);

            await registrarUsuario({
                nombre: formulario.nombre.trim(),
                apellido: formulario.apellido.trim(),
                email: formulario.email.trim(),
                telefono: formulario.telefono.trim(),
                password: formulario.password
            });

            navigate('/login', {
                replace: true,
                state: {
                    mensaje: 'Tu cuenta fue creada correctamente. Ya podés iniciar sesión.'
                }
            });

        } catch (error) {
            setError(error.message);

        } finally {
            setCargando(false);
        }
    };

    useDocumentTitle('Registrar Nueva Cuenta');

    return (
        <AuthLayout
            titulo="Creá tu cuenta"
            subtitulo="Registrate y comenzá a disfrutar de AlquilAR."
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

                <div className="grid gap-4 sm:grid-cols-2">

                    <AuthInput
                        label="Nombre"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        placeholder="Juan"
                        icon={User}
                        error={errores.nombre}
                        autoComplete="given-name"
                        required
                    />

                    <AuthInput
                        label="Apellido"
                        name="apellido"
                        value={formulario.apellido}
                        onChange={handleChange}
                        placeholder="Pérez"
                        icon={User}
                        error={errores.apellido}
                        autoComplete="family-name"
                        required
                    />

                </div>

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
                    label="Teléfono (opcional)"
                    name="telefono"
                    type="tel"
                    value={formulario.telefono}
                    onChange={handleChange}
                    placeholder="381 555 0100"
                    icon={Phone}
                    error={errores.telefono}
                    autoComplete="tel"
                />

                <AuthInput
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={formulario.password}
                    onChange={handleChange}
                    placeholder="Mínimo 8 caracteres"
                    icon={Lock}
                    error={errores.password}
                    autoComplete="new-password"
                    required
                />

                <AuthInput
                    label="Confirmar contraseña"
                    name="confirmarPassword"
                    type="password"
                    value={formulario.confirmarPassword}
                    onChange={handleChange}
                    placeholder="Repetí tu contraseña"
                    icon={Lock}
                    error={errores.confirmarPassword}
                    autoComplete="new-password"
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
                            Creando cuenta...
                        </>
                    ) : (
                        <>
                            <UserPlus size={19} />
                            Crear cuenta
                        </>
                    )}
                </button>

            </form>

            <div className="mt-8 border-t border-gray-100 pt-6 text-center">

                <p className="text-sm text-gray-500">
                    ¿Ya tenés una cuenta?{' '}

                    <Link
                        to="/login"
                        className="font-semibold text-[#E11D2E] hover:underline"
                    >
                        Iniciá sesión
                    </Link>
                </p>

            </div>

        </AuthLayout>
    )
}

export default Registro