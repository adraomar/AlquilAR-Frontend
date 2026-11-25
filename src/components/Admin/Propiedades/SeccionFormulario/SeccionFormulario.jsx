
const SeccionFormulario = ({
    titulo,
    descripcion,
    icon: Icon,
    color = 'bg-red-50 text-[#E11D2E]',
    children
}) => {

    return (
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="flex items-center gap-4 border-b border-gray-100 p-6">

                <div className={`
                    flex h-12 w-12 shrink-0 items-center
                    justify-center rounded-xl ${color}
                `}>

                    <Icon size={23} />

                </div>

                <div>

                    <h2 className="text-lg font-bold text-[#111827]">
                        {titulo}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {descripcion}
                    </p>

                </div>

            </div>

            <div className="p-6">

                {children}

            </div>

        </section>
    );
};

export default SeccionFormulario;
