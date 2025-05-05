export function getPlaceholderImage(width: number, height: number, text?: string): string {
  const textParam = text ? `&text=${encodeURIComponent(text)}` : ""
  return `https://placehold.co/${width}x${height}/EAEAEA/818CF8${textParam}`
}
