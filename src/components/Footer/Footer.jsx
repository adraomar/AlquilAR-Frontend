import React from 'react'

const Footer = () => {
    return (
        <footer
            id="contacto"
            className="bg-[#111827] px-6 py-10 text-center"
        >
            <p className="text-lg font-extrabold text-white">
                Alquil<span className="text-[#E11D2E]">AR</span>
            </p>

            <p className="mt-3 text-sm text-gray-400">
                © {new Date().getFullYear()} AlquilAR.
                Todos los derechos reservados.
            </p>
        </footer>
    )
}

export default Footer