/**
 * Utilidad para calcular el estado de apertura de un negocio en Cabimas, Zulia, Venezuela.
 * Zona horaria: America/Caracas (UTC-4)
 */

// Mapa de días normalizados (sin tildes) -> número de día JS (0=domingo)
const DIAS: Record<string, number> = {
  lunes:      1,
  martes:     2,
  miercoles:  3,
  jueves:     4,
  viernes:    5,
  sabado:     6,
  domingo:    0,
};

/** Normaliza texto: quita tildes y pasa a minúsculas */
function normalizar(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/** Convierte "7:00 am" o "6:00 pm" a minutos desde medianoche */
function parseHora(horaStr: string): number {
  const match = horaStr.trim().match(/(\d+)(?::(\d+))?\s*(am|pm)/i);
  if (!match) return -1;

  let horas = parseInt(match[1]);
  const minutos = match[2] ? parseInt(match[2]) : 0;
  const periodo = match[3].toLowerCase();

  if (periodo === 'pm' && horas !== 12) horas += 12;
  if (periodo === 'am' && horas === 12) horas = 0;

  return horas * 60 + minutos;
}

/**
 * Determina si un negocio está abierto en este momento según el texto del horario.
 * Retorna `true` (abierto), `false` (cerrado), o `undefined` si no se puede parsear.
 *
 * Formatos soportados:
 * - "Lunes a Sábado de 7:00 am a 6:00 pm"
 * - "Lunes a Domingo de 8:00 am a 9:00 pm"
 */
export function calcularIsOpen(schedule: string | undefined | null): boolean | undefined {
  if (!schedule) return undefined;

  const scheduleNorm = normalizar(schedule);

  // Obtener hora actual en Cabimas, Venezuela (America/Caracas = UTC-4)
  const ahora = new Date();
  const venezuelaStr = ahora.toLocaleString('en-US', { timeZone: 'America/Caracas' });
  const venezuelaAhora = new Date(venezuelaStr);

  const diaActual       = venezuelaAhora.getDay(); // 0=Dom, 1=Lun...
  const minutosActuales = venezuelaAhora.getHours() * 60 + venezuelaAhora.getMinutes();

  // Parsear rango de días usando regex sin acentos (ya normalizamos arriba)
  // Formato esperado: "<dia> a <dia> de ..."
  const diasMatch = scheduleNorm.match(/^([a-z]+)\s+a\s+([a-z]+)\s+de\s+/);
  let diasAbiertos: number[] = [];

  if (diasMatch) {
    const diaInicio = DIAS[diasMatch[1]];
    const diaFin    = DIAS[diasMatch[2]];

    if (diaInicio !== undefined && diaFin !== undefined) {
      if (diaInicio <= diaFin) {
        for (let d = diaInicio; d <= diaFin; d++) diasAbiertos.push(d);
      } else {
        // Cruce de semana (ej: Sabado a Lunes)
        for (let d = diaInicio; d <= 6; d++) diasAbiertos.push(d);
        for (let d = 0; d <= diaFin; d++) diasAbiertos.push(d);
      }
    }
  }

  // Parsear rango de horas: "de 7:00 am a 6:00 pm"
  // Buscamos en el string original (no normalizado) para conservar am/pm
  const horasMatch = schedule.match(/de\s+(\d+(?::\d+)?\s*(?:am|pm))\s+a\s+(\d+(?::\d+)?\s*(?:am|pm))/i);
  if (!horasMatch) return undefined;

  const horaApertura = parseHora(horasMatch[1]);
  const horaCierre   = parseHora(horasMatch[2]);
  if (horaApertura === -1 || horaCierre === -1) return undefined;

  const estaDiaAbierto  = diasAbiertos.length === 0 || diasAbiertos.includes(diaActual);
  const estaHoraAbierta = minutosActuales >= horaApertura && minutosActuales < horaCierre;

  return estaDiaAbierto && estaHoraAbierta;
}
