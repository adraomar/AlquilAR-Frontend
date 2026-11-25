import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const AuthInput = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    icon: Icon,
    error,
    autoComplete,
    required = false }) => {

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const esPassword = type === 'password';
    return (
        <div className="space-y-2">

            <label
                htmlFor={name}
                className="block text-sm font-semibold text-[#111827]"
            >
                {label}
                {required && (
                    <span className="ml-1 text-[#E11D2E]">*</span>
                )}
            </label>

            <div
                className={`
                    flex items-center gap-3 rounded-xl border
                    bg-white px-4 transition-all
                    focus-within:ring-2
                    ${error
                        ? 'border-red-500 focus-within:ring-red-100'
                        : 'border-gray-200 focus-within:border-[#E11D2E] focus-within:ring-red-100'
                    }
                `}
            >

                {Icon && (
                    <Icon
                        size={19}
                        className="shrink-0 text-gray-400"
                    />
                )}

                <input
                    id={name}
                    name={name}
                    type={
                        esPassword && mostrarPassword
                            ? 'text'
                            : type
                    }
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                        error ? `${name}-error` : undefined
                    }
                    className="w-full min-w-0 bg-transparent py-3.5 text-sm text-[#111827] outline-none placeholder:text-gray-400"
                />

                {esPassword && (
                    <button
                        type="button"
                        onClick={() =>
                            setMostrarPassword(prev => !prev)
                        }
                        aria-label={
                            mostrarPassword
                                ? 'Ocultar contraseña'
                                : 'Mostrar contraseña'
                        }
                        className="shrink-0 text-gray-400 hover:text-[#111827]"
                    >
                        {mostrarPassword
                            ? <EyeOff size={19} />
                            : <Eye size={19} />
                        }
                    </button>
                )}

            </div>

            {error && (
                <p
                    id={`${name}-error`}
                    className="text-xs font-medium text-red-600"
                >
                    {error}
                </p>
            )}
        </div>
    )
}

export default AuthInput