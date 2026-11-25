
const TIPOS_PERMITIDOS = [
    'casa',
    'departamento',
    'terreno',
    'local',
    'otro'
];

export const validarPropiedad = (datos) => {

    const errores = {};

    const camposTexto = [
        {
            campo: 'titulo',
            nombre: 'El título',
            maximo: 150
        },
        {
            campo: 'direccion',
            nombre: 'La dirección',
            maximo: 255
        },
        {
            campo: 'ciudad',
            nombre: 'La ciudad',
            maximo: 100
        },
        {
            campo: 'provincia',
            nombre: 'La provincia',
            maximo: 100
        }
    ];

    camposTexto.forEach(({ campo, nombre, maximo }) => {

        const valor = datos[campo].trim();

        if (!valor) {

            errores[campo] = `${nombre} es obligatorio/a`;

        } else if (valor.length > maximo) {

            errores[campo] =
                `${nombre} no puede superar los ${maximo} caracteres`;

        }

    });

    if (!TIPOS_PERMITIDOS.includes(datos.tipo)) {
        errores.tipo = 'Seleccioná un tipo de propiedad';
    }

    if (datos.descripcion.length > 10000) {
        errores.descripcion =
            'La descripción no puede superar los 10000 caracteres';
    }

    ['habitaciones', 'banios'].forEach(campo => {

        const valor = Number(datos[campo]);

        if (
            !Number.isSafeInteger(valor) ||
            valor < 0 ||
            valor > 4294967295
        ) {
            errores[campo] =
                'Ingresá un número entero mayor o igual a cero';
        }

    });

    ['superficie_total', 'superficie_cubierta']
        .forEach(campo => {

            if (datos[campo] === '') return;

            const valor = Number(datos[campo]);

            if (
                !Number.isFinite(valor) ||
                valor <= 0 ||
                valor > 99999999.99
            ) {

                errores[campo] =
                    'Ingresá una superficie válida mayor a cero';

            } else if (
                Math.abs(valor * 100 - Math.round(valor * 100)) > 0.00001
            ) {

                errores[campo] =
                    'Ingresá como máximo dos decimales';

            }

        });

    if (
        datos.superficie_total !== '' &&
        datos.superficie_cubierta !== '' &&
        !errores.superficie_total &&
        !errores.superficie_cubierta &&
        Number(datos.superficie_cubierta) >
        Number(datos.superficie_total)
    ) {

        errores.superficie_cubierta =
            'La superficie cubierta no puede superar la total';

    }

    return errores;
};

export const prepararDatosPropiedad = (datos) => {

    return {
        titulo: datos.titulo.trim(),
        descripcion: datos.descripcion.trim() || null,
        tipo: datos.tipo,
        direccion: datos.direccion.trim(),
        ciudad: datos.ciudad.trim(),
        provincia: datos.provincia.trim(),

        habitaciones: Number(datos.habitaciones),
        banios: Number(datos.banios),

        superficie_total: datos.superficie_total === ''
            ? null
            : Number(datos.superficie_total),

        superficie_cubierta: datos.superficie_cubierta === ''
            ? null
            : Number(datos.superficie_cubierta),

        cochera: datos.cochera,
        balcon: datos.balcon,
        patio: datos.patio,
        piscina: datos.piscina
    };
};
