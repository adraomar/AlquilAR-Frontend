import React from 'react'
import { useState } from 'react';
import {
    Lock,
    ShieldCheck,
    LoaderCircle,
    AlertCircle,
    CheckCircle
} from 'lucide-react';

import AuthInput from '../AuthInput/AuthInput';
import useAuth from '../../hooks/useAuth';

const FORMULARIO_INICIAL = {
    passwordActual: '',
    passwordNueva: '',
    confirmarPassword: ''
};

const PerfilSeguridad = () => {
    const { cambiarPassword } = useAuth();

    const [formulario, setFormulario] = useState(
        FORMULARIO_INICIAL
    );

    const [errores, setErrores] = useState({});
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');
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
            ...(name === 'passwordNueva'
                ? { confirmarPassword: '' }
                : {})
        }));

        setError('');
        setExito('');
    };

    const validarFormulario = () => {

        const nuevosErrores = {};

        const encoder = new TextEncoder();

        if (!formulario.passwordActual) {

            nuevosErrores.passwordActual =
                'Ingresá tu contraseña actual';

        } else if (
            encoder.encode(formulario.passwordActual).length > 72
        ) {

            nuevosErrores.passwordActual =
                'La contraseña supera la longitud permitida';

        }

        if (formulario.passwordNueva.length < 8) {

            nuevosErrores.passwordNueva =
                'Debe tener al menos 8 caracteres';

        } else if (
            encoder.encode(formulario.passwordNueva).length > 72
        ) {

            nuevosErrores.passwordNueva =
                'La contraseña supera la longitud permitida';

        } else if (
            formulario.passwordNueva === formulario.passwordActual
        ) {

            nuevosErrores.passwordNueva =
                'Debe ser diferente a la contraseña actual';

        }

        if (!formulario.confirmarPassword) {

            nuevosErrores.confirmarPassword =
                'Confirmá tu nueva contraseña';

        } else if (
            formulario.passwordNueva !== formulario.confirmarPassword
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
        setExito('');

        if (!validarFormulario()) return;

        try {

            setCargando(true);

            await cambiarPassword({
                passwordActual: formulario.passwordActual,
                passwordNueva: formulario.passwordNueva
            });

            setFormulario(FORMULARIO_INICIAL);
            setErrores({});

            setExito('Tu contraseña fue actualizada correctamente.');

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
                    <Lock size={24} />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-[#111827]">
                        Seguridad de la cuenta
                    </h2>

                    <p className="text-sm text-gray-500">
                        Administrá tu contraseña de acceso.
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
                    className="space-y-5"
                >

                    <AuthInput
                        label="Contraseña actual"
                        name="passwordActual"
                        type="password"
                        value={formulario.passwordActual}
                        onChange={handleChange}
                        placeholder="Ingresá tu contraseña actual"
                        icon={Lock}
                        error={errores.passwordActual}
                        autoComplete="current-password"
                        required
                    />

                    <AuthInput
                        label="Nueva contraseña"
                        name="passwordNueva"
                        type="password"
                        value={formulario.passwordNueva}
                        onChange={handleChange}
                        placeholder="Ingresá tu nueva contraseña"
                        icon={Lock}
                        error={errores.passwordNueva}
                        autoComplete="new-password"
                        required
                    />

                    <AuthInput
                        label="Confirmar nueva contraseña"
                        name="confirmarPassword"
                        type="password"
                        value={formulario.confirmarPassword}
                        onChange={handleChange}
                        placeholder="Repetí tu nueva contraseña"
                        icon={Lock}
                        error={errores.confirmarPassword}
                        autoComplete="new-password"
                        required
                    />

                </fieldset>

                <div className="flex items-start gap-3 rounded-xl bg-[#F4F5F7] p-4">

                    <ShieldCheck
                        size={20}
                        className="shrink-0 text-gray-500"
                    />

                    <p className="text-xs leading-relaxed text-gray-600">
                        Utilizá una contraseña de al menos 8 caracteres.
                        Recomendamos combinar letras, números y símbolos,
                        y evitar reutilizar contraseñas de otras cuentas.
                    </p>

                </div>

                <div className="flex justify-end border-t border-gray-100 pt-5">

                    <button
                        type="submit"
                        disabled={cargando}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {cargando ? (
                            <LoaderCircle
                                size={18}
                                className="animate-spin"
                            />
                        ) : (
                            <Lock size={18} />
                        )}

                        {cargando
                            ? 'Actualizando...'
                            : 'Cambiar contraseña'
                        }

                    </button>
                </div>
            </form>
        </section>
    )
}

export default PerfilSeguridad