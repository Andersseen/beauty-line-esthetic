/** Business facts that are not translatable copy. */
export const BUSINESS = {
  phone: '+34645228782',
  /** Alcorcón, Madrid — latitude, longitude. */
  location: [40.345131, -3.835258] as [number, number],
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d319.6111920512934!2d-3.8297826280890686!3d40.349638719562485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd418eca28956423%3A0xbe6c8ec3a102acfc!2sBeauty%20Line!5e0!3m2!1ses!2ses!4v1727965468346!5m2!1ses!2ses',
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent(message)}`;
}

/** Indices `0..length-1` of a catalog list, read from the Spanish source catalog's shape. */
export function indicesOf(list: object): number[] {
  return Object.keys(list).map(Number);
}
