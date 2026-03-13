import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '../../../domain/FormSchema';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ContactInfoPanel } from './ContactInfoPanel';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulación de envío a un API (Mock)
      console.log('Datos del formulario capturados:', data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      reset(); // Limpiar el formulario en caso de éxito
      
      // Restaurar estado después de 5 segundos
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contacto" className="bg-brand-light py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
            
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-brand-dark mb-4">
                    Anúnciate con <span className="text-brand-primary">Nosotros</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Aumenta la visibilidad de tu negocio anunciándote en el programa de radio con mayor sintonía. Déjanos tus datos y nos pondremos en contacto contigo.
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                
                {/* Panel lateral de info */}
                <ContactInfoPanel />

                {/* Formulario */}
                <div className="p-10 md:w-3/5">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre */}
                            <div className="space-y-1">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo *</label>
                                <input
                                    id="name"
                                    type="text"
                                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${errors.name ? 'border-brand-accent-red focus:border-brand-accent-red focus:ring-brand-accent-red/20' : 'border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20 bg-gray-50'}`}
                                    placeholder="Juan Pérez"
                                    {...register('name')}
                                />
                                {errors.name && <p className="text-brand-accent-red text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Empresa */}
                            <div className="space-y-1">
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Empresa / Negocio *</label>
                                <input
                                    id="company"
                                    type="text"
                                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${errors.company ? 'border-brand-accent-red focus:border-brand-accent-red focus:ring-brand-accent-red/20' : 'border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20 bg-gray-50'}`}
                                    placeholder="Mi Negocio C.A."
                                    {...register('company')}
                                />
                                {errors.company && <p className="text-brand-accent-red text-xs mt-1">{errors.company.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Teléfono */}
                            <div className="space-y-1">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono (WhatsApp) *</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${errors.phone ? 'border-brand-accent-red focus:border-brand-accent-red focus:ring-brand-accent-red/20' : 'border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20 bg-gray-50'}`}
                                    placeholder="0414-1234567"
                                    {...register('phone')}
                                />
                                {errors.phone && <p className="text-brand-accent-red text-xs mt-1">{errors.phone.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                                <input
                                    id="email"
                                    type="email"
                                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${errors.email ? 'border-brand-accent-red focus:border-brand-accent-red focus:ring-brand-accent-red/20' : 'border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20 bg-gray-50'}`}
                                    placeholder="contacto@empresa.com"
                                    {...register('email')}
                                />
                                {errors.email && <p className="text-brand-accent-red text-xs mt-1">{errors.email.message}</p>}
                            </div>
                        </div>

                        {/* Mensaje */}
                        <div className="space-y-1">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">¿Qué tipo de pauta deseas? *</label>
                            <textarea
                                id="message"
                                rows={4}
                                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors resize-none ${errors.message ? 'border-brand-accent-red focus:border-brand-accent-red focus:ring-brand-accent-red/20' : 'border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20 bg-gray-50'}`}
                                placeholder="Me interesa conocer los planes para promocionar mi negocio durante el fin de semana..."
                                {...register('message')}
                            ></textarea>
                            {errors.message && <p className="text-brand-accent-red text-xs mt-1">{errors.message.message}</p>}
                        </div>

                        {/* Mensajes de Estado */}
                        {submitStatus === 'success' && (
                            <div className="bg-brand-accent-green/10 text-brand-accent-green p-4 rounded-lg flex items-center">
                                <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
                                <p className="text-sm">¡Mensaje enviado con éxito! Nos pondremos en contacto muy pronto.</p>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="bg-brand-accent-red/10 text-brand-accent-red p-4 rounded-lg flex items-center">
                                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                <p className="text-sm">Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.</p>
                            </div>
                        )}

                        {/* Botón Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-brand-primary hover:bg-brand-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando...
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    Enviar Mensaje
                                    <Send className="w-5 h-5 ml-2" />
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}
