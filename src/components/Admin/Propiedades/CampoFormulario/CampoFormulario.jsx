
const CampoFormulario = ({
    label,
    name,
    value,
    onChange,
    type = 'text',
    placeholder,
    error,
    required = false,
    opciones = [],
    ...props
}) => {

    const estilos = `
        w-full rounded-xl border bg-white px-4 py-3
        text-sm text-[#111827] outline-none transition
        placeholder:text-gray-400 focus:ring-2
        ${error
            ? 'border-red-500 focus:ring-red-100'
            : 'border-gray-200 focus:border-[#E11D2E] focus:ring-red-100'
        }
    `;

    const atributos = {
        ...props,
        id: name,
        name,
        value,
        onChange,
        required,
        'aria-invalid': Boolean(error),
        'aria-describedby': error
            ? `${name}-error`
            : undefined,
        className: estilos
    };

    return (
        <div className="space-y-2">

            <label
                htmlFor={name}
                className="block text-sm font-semibold text-gray-700"
            >
                {label}

                {required && (
                    <span className="ml-1 text-[#E11D2E]">
                        *
                    </span>
                )}

            </label>

            {type === 'select' ? (

                <select {...atributos}>

                    <option value="">
                        Seleccionar una opción
                    </option>

                    {opciones.map(opcion => (

                        <option
                            key={opcion.value}
                            value={opcion.value}
                        >
                            {opcion.label}
                        </option>

                    ))}

                </select>

            ) : type === 'textarea' ? (

                <textarea
                    {...atributos}
                    placeholder={placeholder}
                />

            ) : (

                <input
                    {...atributos}
                    type={type}
                    placeholder={placeholder}
                />

            )}

            {error && (

                <p
                    id={`${name}-error`}
                    className="text-xs font-medium text-red-600"
                >
                    {error}
                </p>

            )}

        </div>
    );
};

export default CampoFormulario;
