import React, { useEffect, useState } from 'react'
import {
    obtenerImagenes,
    subirImagenes,
    establecerPortada,
    eliminarImagen
} from '../services/imagenes.api';

const API_URL = 'http://localhost:3000';

const GestorImagenes = ({ idPropiedad }) => {
    const [imagenes, setImagenes] = useState([]);
    const [archivos, setArchivos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const cargarImagenes = async () => {
        try {
            const datos = await obtenerImagenes(idPropiedad);
            setImagenes(datos);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        cargarImagenes();
    }, [idPropiedad]);

    const manejarSubida = async (e) => {
        e.preventDefault();

        if (archivos.length === 0) return;

        setCargando(true);
        setError('');
        setMensaje('');

        try {
            const datos = await subirImagenes(
                idPropiedad,
                archivos
            );

            setImagenes(datos);
            setArchivos([]);
            e.target.reset();
            setMensaje('Imágenes subidas correctamente');
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    const cambiarPortada = async (idImagen) => {
        try {
            const datos = await establecerPortada(
                idPropiedad,
                idImagen
            );

            setImagenes(datos);
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    const borrarImagen = async (idImagen) => {
        if (!window.confirm('¿Eliminar esta imagen?')) return;

        try {
            await eliminarImagen(idPropiedad, idImagen);
            await cargarImagenes();
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
                Fotografías de la propiedad #{idPropiedad}
            </h2>

            <form
                onSubmit={manejarSubida}
                className="mb-6 flex flex-col gap-4"
            >
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={(e) =>
                        setArchivos(Array.from(e.target.files))
                    }
                    className="rounded-xl border border-slate-200 p-3"
                />

                <button
                    type="submit"
                    disabled={cargando || archivos.length === 0}
                    className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
                >
                    {cargando ? 'Subiendo...' : 'Subir fotografías'}
                </button>
            </form>

            {error && (
                <p className="mb-4 text-red-600">{error}</p>
            )}

            {mensaje && (
                <p className="mb-4 text-green-600">{mensaje}</p>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {imagenes.map((imagen) => (
                    <div
                        key={imagen.id_imagen}
                        className="overflow-hidden rounded-xl border border-slate-200"
                    >
                        <img
                            src={`${API_URL}${imagen.ruta_archivo}`}
                            alt={imagen.nombre_original || 'Propiedad'}
                            className="h-44 w-full object-cover"
                        />

                        <div className="space-y-3 p-3">
                            {Boolean(imagen.es_portada) && (
                                <span className="text-sm font-bold text-green-700">
                                    Imagen de portada
                                </span>
                            )}

                            <div className="flex flex-wrap gap-2">
                                {!Boolean(imagen.es_portada) && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            cambiarPortada(imagen.id_imagen)
                                        }
                                        className="rounded-lg bg-blue-100 px-3 py-2 text-sm text-blue-700"
                                    >
                                        Establecer portada
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={() =>
                                        borrarImagen(imagen.id_imagen)
                                    }
                                    className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default GestorImagenes