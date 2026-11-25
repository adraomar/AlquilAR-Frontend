import React from 'react'
import { useState, useEffect } from 'react';
import {
    UserRound,
    Mail,
    Phone,
    Save,
    LoaderCircle,
    AlertCircle,
    CheckCircle
} from 'lucide-react';

import AuthInput from '../AuthInput/AuthInput';
import useAuth from '../../hooks/useAuth';

const PerfilDatos = () => {
    const { usuario, actualizarPerfil } = useAuth();

    const [formulario, setFormulario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: ''
    });

    const [errores, setErrores] = useState({});
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');
    const [cargando, setCargando] = useState(false);

    useEffect(() => {

        setFormulario({
            nombre: usuario.nombre || '',
            apellido: usuario.apellido || '',
            email: usuario.email || '',
            telefono: usuario.telefono || ''
        });

    }, [usuario]);

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

        if (
            !emailRegex.test(formulario.email.trim()) ||
            formulario.email.trim().length > 150
        ) {
            nuevosErrores.email = 'Ingresá un correo válido';
        }

        if (formulario.telefono.trim().length > 30) {
            nuevosErrores.telefono = 'Máximo 30 caracteres';
        }

        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    };

    const hayCambios =
        formulario.nombre !== (usuario.nombre || '') ||
        formulario.apellido !== (usuario.apellido || '') ||
        formulario.email !== (usuario.email || '') ||
        formulario.telefono !== (usuario.telefono || '');

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (cargando || !hayCambios) return;

        setError('');
        setExito('');

        if (!validarFormulario()) return;

        try {

            setCargando(true);

            await actualizarPerfil({
                nombre: formulario.nombre.trim(),
                apellido: formulario.apellido.trim(),
                email: formulario.email.trim(),
                telefono: formulario.telefono.trim()
            });

            setExito('Tus datos fueron actualizados correctamente.');

        } catch (error) {

            setError(error.message);

        } finally {

            setCargando(false);

        }
    };

    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">

                <div className="rounded-xl bg-red-50 p-3 text-[#E11D2E]">
                    <UserRound size={24} />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-[#111827]">
                        Información personal
                    </h2>

                    <p className="text-sm text-gray-500">
                        Actualizá los datos de tu cuenta.
                    </p>
                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
            >

                {error && (
                    <div role="alert" className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <AlertCircle size={20} className="shrink-0" />
                        {error}
                    </div>
                )}

                {exito && (
                    <div role="status" className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                        <CheckCircle size={20} className="shrink-0" />
                        {exito}
                    </div>
                )}

                <fieldset
                    disabled={cargando}
                    className="grid gap-5 sm:grid-cols-2"
                >

                    <AuthInput
                        label="Nombre"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        icon={UserRound}
                        error={errores.nombre}
                        autoComplete="given-name"
                        required
                    />

                    <AuthInput
                        label="Apellido"
                        name="apellido"
                        value={formulario.apellido}
                        onChange={handleChange}
                        icon={UserRound}
                        error={errores.apellido}
                        autoComplete="family-name"
                        required
                    />

                    <AuthInput
                        label="Correo electrónico"
                        name="email"
                        type="email"
                        value={formulario.email}
                        onChange={handleChange}
                        icon={Mail}
                        error={errores.email}
                        autoComplete="email"
                        required
                    />

                    <AuthInput
                        label="Teléfono"
                        name="telefono"
                        type="tel"
                        value={formulario.telefono}
                        onChange={handleChange}
                        icon={Phone}
                        error={errores.telefono}
                        autoComplete="tel"
                    />

                </fieldset>

                <div className="flex justify-end border-t border-gray-100 pt-5">

                    <button
                        type="submit"
                        disabled={cargando || !hayCambios}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#E11D2E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {cargando ? (
                            <LoaderCircle
                                size={18}
                                className="animate-spin"
                            />
                        ) : (
                            <Save size={18} />
                        )}

                        {cargando
                            ? 'Guardando...'
                            : 'Guardar cambios'
                        }

                    </button>

                </div>

            </form>

        </section>
    )
}

export default PerfilDatos