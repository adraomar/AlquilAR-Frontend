
import { useState, useEffect } from 'react';

import {
    Search,
    SlidersHorizontal,
    X
} from 'lucide-react';

const FiltrosPropiedades = ({
    filtros,
    onCambiarFiltro,
    onLimpiar
}) => {

    const [busqueda, setBusqueda] = useState(
        filtros.busqueda
    );

    useEffect(() => {

        setBusqueda(filtros.busqueda);

    }, [filtros.busqueda]);

    useEffect(() => {

        if (busqueda === filtros.busqueda) return;

        const temporizador = setTimeout(() => {

            onCambiarFiltro('busqueda', busqueda);

        }, 400);

        return () => clearTimeout(temporizador);

    }, [
        busqueda,
        filtros.busqueda,
        onCambiarFiltro
    ]);

    const hayFiltros =
        busqueda !== '' ||
        filtros.tipo !== 'todos' ||
        filtros.estado !== 'todas';

    const limpiar = () => {

        setBusqueda('');
        onLimpiar();

    };

    const estiloSelect = `
        w-full rounded-xl border border-gray-200
        bg-white px-4 py-3 text-sm text-gray-700
        outline-none transition
        focus:border-[#E11D2E]
        focus:ring-2 focus:ring-red-100
    `;

    return (
        <div className="border-b border-gray-100 p-5">

            <div className="mb-4 flex items-center gap-2">

                <SlidersHorizontal
                    size={18}
                    className="text-gray-500"
                />

                <h2 className="text-sm font-bold text-[#111827]">
                    Filtros de búsqueda
                </h2>

            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_auto]">

                {/* Buscador */}
                <div className="relative">

                    <Search
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="search"
                        value={busqueda}
                        maxLength={150}
                        aria-label="Buscar propiedades"
                        onChange={e => setBusqueda(e.target.value)}
                        placeholder="Buscar por título, dirección o ID..."
                        className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#E11D2E] focus:ring-2 focus:ring-red-100"
                    />

                </div>

                {/* Tipo */}
                <select
                    value={filtros.tipo}
                    aria-label="Tipo de propiedad"
                    onChange={e => onCambiarFiltro(
                        'tipo',
                        e.target.value
                    )}
                    className={estiloSelect}
                >

                    <option value="todos">
                        Todos los tipos
                    </option>

                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="terreno">Terreno</option>
                    <option value="local">Local</option>
                    <option value="otro">Otro</option>

                </select>

                {/* Estado */}
                <select
                    value={filtros.estado}
                    aria-label="Estado de propiedad"
                    onChange={e => onCambiarFiltro(
                        'estado',
                        e.target.value
                    )}
                    className={estiloSelect}
                >

                    <option value="todas">
                        Todos los estados
                    </option>

                    <option value="activa">Activas</option>
                    <option value="inactiva">Inactivas</option>

                </select>

                {/* Limpiar filtros */}
                <button
                    type="button"
                    onClick={limpiar}
                    disabled={!hayFiltros}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >

                    <X size={17} />
                    Limpiar

                </button>

            </div>

        </div>
    );
};

export default FiltrosPropiedades;
