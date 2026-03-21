export function ContactInfoPanel() {
    return (
        <div className="bg-gradient-to-br from-brand-primary to-brand-accent-red p-10 text-white md:w-2/5 flex flex-col justify-between">
            <div>
                <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                <p className="text-white/80 mb-8">Llena el formulario para conocer nuestros planes publicitarios, adaptados a tus necesidades.</p>
                
                <div className="space-y-6">
                    <div className="flex items-start">
                        <svg className="w-6 h-6 mr-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span>Cabimas, Zulia</span>
                    </div>
                    <div className="flex items-start">
                        <svg className="w-6 h-6 mr-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <span>+58 414-6791343</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
