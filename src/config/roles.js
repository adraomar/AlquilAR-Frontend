export const ROLES = Object.freeze({
    ADMIN_SISTEMA: 'admin_sistema',
    ADMIN_CONSORCIO: 'admin_consorcio',
    RESIDENTE: 'residente',
    VISITANTE: 'visitante',
    TECNICO: 'tecnico',
    ADMIN_INMOBILIARIA: 'admin_inmobiliaria'
});

export const NOMBRES_ROLES = Object.freeze({
    [ROLES.ADMIN_SISTEMA]: 'Administrador del sistema',
    [ROLES.ADMIN_CONSORCIO]: 'Administrador de consorcio',
    [ROLES.RESIDENTE]: 'Residente',
    [ROLES.VISITANTE]: 'Visitante',
    [ROLES.TECNICO]: 'Técnico',
    [ROLES.ADMIN_INMOBILIARIA]: 'Administrador inmobiliario'
});