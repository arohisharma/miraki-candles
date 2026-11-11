/** Builds a sized Unsplash image URL from a photo id. Used for sample/stock photography only. */
export const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
