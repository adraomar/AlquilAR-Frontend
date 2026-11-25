
import { Link } from 'react-router-dom';

import {
    Building2,
    MapPin,
    Ruler,
    Sparkles,
    Car,
    Building,
    Trees,
    Waves,
    Save,
    LoaderCircle,
    AlertCircle,
    Info
} from 'lucide-react';

import CampoFormulario from '../CampoFormulario/CampoFormulario';
import SeccionFormulario from '../SeccionFormulario/SeccionFormulario';

import useFormularioPropiedad from '../../../../hooks/useFormulario';

const tipos = [
    { value: 'casa', label: 'Casa' },
    { value: 'departamento', label: 'Departamento' },
    { value: 'terreno', label: 'Terreno' },
    { value: 'local', label: 'Local' },
    { value: 'otro', label: 'Otro' }
];

const comodidades = [
    { name: 'cochera', label: 'Cochera', icon: Car },
    { name: 'balcon', label: 'Balcón', icon: Building },
    { name: 'patio', label: 'Patio', icon: Trees },
    { name: 'piscina', label: 'Piscina', icon: Waves }
];

const FormularioPropiedad = ({
    datosIniciales,
    onGuardar,
    textoBoton = 'Guardar propiedad',
    modo = 'crear'
}) => {

    const {
        formulario,
        errores,
        error,
        guardando,
        manejarCambio,
        manejarSubmit
    } = useFormularioPropiedad({
        datosIniciales,
        onGuardar
    });

    const campo = (name) => ({
        name,
        value: formulario[name],
        onChange: manejarCambio,
        error: errores[name]
    });

    return (
        <form
            onSubmit={manejarSubmit}
            noValidate
            className="space-y-6"
        >

            <fieldset
                disabled={guardando}
                className="min-w-0 space-y-6 disabled:opacity-70"
            >

                {/* Información general */}
                <SeccionFormulario
                    titulo="Información general"
                    descripcion="Datos principales del inmueble."
                    icon={Building2}
                >

                    <div className="space-y-5">

                        <div className="grid gap-5 md:grid-cols-3">

                            <div className="md:col-span-2">

                                <CampoFormulario
                                    {...campo('titulo')}
                                    label="Título de la propiedad"
                                    placeholder="Ej. Departamento moderno en Barrio Norte"
                                    maxLength={150}
                                    required
                                />

                            </div>

                            <CampoFormulario
                                {...campo('tipo')}
                                label="Tipo de propiedad"
                                type="select"
                                opciones={tipos}
                                required
                            />

                        </div>

                        <CampoFormulario
                            {...campo('descripcion')}
                            label="Descripción"
                            type="textarea"
                            rows={5}
                            maxLength={10000}
                            placeholder="Describí las características del inmueble..."
                        />

                    </div>

                </SeccionFormulario>

                {/* Ubicación */}
                <SeccionFormulario
                    titulo="Ubicación"
                    descripcion="Dirección y ubicación del inmueble."
                    icon={MapPin}
                    color="bg-blue-50 text-blue-600"
                >

                    <div className="grid gap-5 md:grid-cols-2">

                        <div className="md:col-span-2">

                            <CampoFormulario
                                {...campo('direccion')}
                                label="Dirección"
                                placeholder="Ej. Muñecas 850"
                                maxLength={255}
                                required
                            />

                        </div>

                        <CampoFormulario
                            {...campo('provincia')}
                            label="Provincia"
                            placeholder="Ej. Tucumán"
                            maxLength={100}
                            required
                        />

                        <CampoFormulario
                            {...campo('ciudad')}
                            label="Ciudad"
                            placeholder="Ej. San Miguel de Tucumán"
                            maxLength={100}
                            required
                        />

                    </div>

                </SeccionFormulario>

                {/* Características */}
                <SeccionFormulario
                    titulo="Características"
                    descripcion="Dimensiones y distribución del inmueble."
                    icon={Ruler}
                    color="bg-green-50 text-green-700"
                >

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        <CampoFormulario
                            {...campo('habitaciones')}
                            label="Habitaciones"
                            type="number"
                            min={0}
                            step={1}
                        />

                        <CampoFormulario
                            {...campo('banios')}
                            label="Baños"
                            type="number"
                            min={0}
                            step={1}
                        />

                        <CampoFormulario
                            {...campo('superficie_total')}
                            label="Superficie total (m²)"
                            type="number"
                            min={0.01}
                            step={0.01}
                            placeholder="Ej. 120"
                        />

                        <CampoFormulario
                            {...campo('superficie_cubierta')}
                            label="Superficie cubierta (m²)"
                            type="number"
                            min={0.01}
                            step={0.01}
                            placeholder="Ej. 95"
                        />

                    </div>

                </SeccionFormulario>

                {/* Comodidades */}
                <SeccionFormulario
                    titulo="Comodidades"
                    descripcion="Seleccioná las prestaciones disponibles."
                    icon={Sparkles}
                    color="bg-violet-50 text-violet-600"
                >

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {comodidades.map(comodidad => {

                            const Icon = comodidad.icon;

                            const seleccionada =
                                formulario[comodidad.name];

                            return (
                                <label
                                    key={comodidad.name}
                                    className={`
                                        flex cursor-pointer items-center
                                        gap-3 rounded-xl border p-4
                                        transition-all
                                        ${seleccionada
                                            ? 'border-[#E11D2E] bg-red-50 text-[#E11D2E]'
                                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }
                                    `}
                                >

                                    <Icon size={23} />

                                    <span className="flex-1 text-sm font-semibold">
                                        {comodidad.label}
                                    </span>

                                    <input
                                        type="checkbox"
                                        name={comodidad.name}
                                        checked={seleccionada}
                                        onChange={manejarCambio}
                                        className="h-4 w-4 accent-[#E11D2E]"
                                    />

                                </label>
                            );

                        })}

                    </div>

                </SeccionFormulario>

            </fieldset>

            {modo === 'crear' && (

                <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">

                    <Info
                        size={20}
                        className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <p className="text-sm leading-relaxed text-blue-800">
                        La propiedad se registrará como activa.
                        Para que aparezca en el catálogo público,
                        deberás crear una publicación posteriormente.
                    </p>

                </div>

            )}

            {/* Errores */}
            {error && (

                <div
                    role="alert"
                    className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >

                    <AlertCircle
                        size={20}
                        className="shrink-0"
                    />

                    {error}

                </div>

            )}

            {/* Acciones */}
            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-gray-200 pt-6">

                {guardando ? (

                    <span className="rounded-xl border border-gray-200 px-6 py-3 text-sm text-gray-400">
                        Cancelar
                    </span>

                ) : (

                    <Link
                        to="/admin/propiedades"
                        className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                    >
                        Cancelar
                    </Link>

                )}

                <button
                    type="submit"
                    disabled={guardando}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#E11D2E] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                    {guardando ? (

                        <LoaderCircle
                            size={19}
                            className="animate-spin"
                        />

                    ) : (

                        <Save size={19} />

                    )}

                    {guardando
                        ? 'Guardando...'
                        : textoBoton
                    }

                </button>

            </div>

        </form>
    );
};

export default FormularioPropiedad;
