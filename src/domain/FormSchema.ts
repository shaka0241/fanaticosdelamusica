import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  company: z.string().min(2, "El nombre de la empresa es requerido"),
  phone: z.string().min(10, "Ingrese un número de teléfono válido"),
  email: z.string().email("Correo electrónico inválido").optional().or(z.literal('')),
  message: z.string().min(10, "El mensaje debe ser más detallado (mín. 10 caracteres)"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
