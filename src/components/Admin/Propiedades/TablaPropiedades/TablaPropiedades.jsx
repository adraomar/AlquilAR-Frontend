
import {
    House,
    MapPin,
    Eye,
    Pencil,
    Images,
    Trash2,
    SearchX
} from 'lucide-react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const TablaPropiedades = ({ propiedades }) => {

    const acciones = [
        {
            nombre: 'Ver propiedad',
            icon: Eye,
            color: 'text-gray-600 hover:bg-gray-100'
        },
        {
            nombre: 'Editar propiedad',
            icon: Pencil,
            color: 'text-blue-600 hover:bg-blue-50'
        },
        {
            nombre: 'Administrar imágenes',
            icon: Images,
            color: 'text-violet-600 hover:bg-violet-50'
        },
        {
            nombre: 'Desactivar propiedad',
            icon: Trash2,
            color: 'text-[#E11D2E] hover:bg-red-50'
        }
    ];

    const encabezados = [
        'Propiedad',
        'Tipo',
        'Superficie',
        'Estado',
        'Registro',
        'Acciones'
    ];

    if (propiedades.length === 0) {

        return (
            <div className="flex flex-col items-center px-6 py-16 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">

                    <SearchX
                        size={30}
                        className="text-gray-400"
                    />

                </div>

                <h3 className="font-bold text-[#111827]">
                    No se encontraron propiedades
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                    Probá modificando los filtros de búsqueda.
                </p>

            </div>
        );
    }

    return (
        <div className="overflow-x-auto">

            <table className="w-full min-w-[850px] text-left">

                <thead className="border-b border-gray-200 bg-gray-50">

                    <tr>

                        {encabezados.map(encabezado => (

                            <th
                                key={encabezado}
                                scope="col"
                                className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500"
                            >
                                {encabezado}
                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                    {propiedades.map(propiedad => (

                        <tr
                            key={propiedad.id_propiedad}
                            className="transition hover:bg-gray-50"
                        >

                            {/* Propiedad */}
                            <td className="px-5 py-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-14 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F4F5F7]">

                                        {propiedad.imagen_portada ? (

                                            <img
                                                src={`${SERVER_URL}${propiedad.imagen_portada}`}
                                                alt={propiedad.titulo}
                                                loading="lazy"
                                                className="h-full w-full object-cover"
                                            />

                                        ) : (

                                            <House
                                                size={23}
                                                className="text-gray-400"
                                            />

                                        )}

                                    </div>

                                    <div className="min-w-0">

                                        <p
                                            title={propiedad.titulo}
                                            className="max-w-64 truncate text-sm font-semibold text-[#111827]"
                                        >
                                            {propiedad.titulo}
                                        </p>

                                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">

                                            <MapPin size={13} />

                                            {propiedad.ciudad}

                                        </p>

                                        <p className="mt-1 text-[11px] text-gray-400">
                                            ID #{propiedad.id_propiedad}
                                        </p>

                                    </div>

                                </div>

                            </td>

                            {/* Tipo */}
                            <td className="px-5 py-4">

                                <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium capitalize text-gray-600">
                                    {propiedad.tipo}
                                </span>

                            </td>

                            {/* Superficie */}
                            <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">

                                {propiedad.superficie_total != null
                                    ? `${Number(propiedad.superficie_total).toLocaleString('es-AR')} m²`
                                    : '—'
                                }

                            </td>

                            {/* Estado */}
                            <td className="px-5 py-4">

                                <span className={`
                                    inline-flex items-center gap-1.5
                                    rounded-full px-3 py-1.5
                                    text-xs font-semibold
                                    ${propiedad.estado === 'activa'
                                        ? 'bg-green-50 text-green-700'
                                        : 'bg-gray-100 text-gray-600'
                                    }
                                `}>

                                    <span className={`
                                        h-1.5 w-1.5 rounded-full
                                        ${propiedad.estado === 'activa'
                                            ? 'bg-green-500'
                                            : 'bg-gray-400'
                                        }
                                    `} />

                                    {propiedad.estado === 'activa'
                                        ? 'Activa'
                                        : 'Inactiva'
                                    }

                                </span>

                            </td>

                            {/* Fecha */}
                            <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">

                                {new Date(propiedad.created_at)
                                    .toLocaleDateString('es-AR')}

                            </td>

                            {/* Acciones */}
                            <td className="px-5 py-4">

                                <div className="flex items-center gap-1">

                                    {acciones.map(accion => {

                                        const Icon = accion.icon;

                                        return (
                                            <button
                                                key={accion.nombre}
                                                type="button"
                                                disabled
                                                title={`${accion.nombre} (próximamente)`}
                                                aria-label={accion.nombre}
                                                className={`
                                                    rounded-lg p-2 transition
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-40
                                                    ${accion.color}
                                                `}
                                            >
                                                <Icon size={18} />
                                            </button>
                                        );
                                    })}

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default TablaPropiedades;
