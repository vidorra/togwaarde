/**
 * Leest een JSON-body met een harde grens in bytes. Werkt ook zonder
 * Content-Length (chunked), waar request.json() alles in het geheugen zou laden.
 *
 * @returns {Promise<{ tooLarge: boolean, data: any }>} data is null bij lege of ongeldige JSON
 */
export async function readJsonCapped(request, maxBytes) {
  const declared = Number(request.headers.get('content-length') || 0)
  if (declared > maxBytes) return { tooLarge: true, data: null }
  if (!request.body) return { tooLarge: false, data: null }

  const reader = request.body.getReader()
  const chunks = []
  let size = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > maxBytes) {
      reader.cancel().catch(() => {})
      return { tooLarge: true, data: null }
    }
    chunks.push(value)
  }

  try {
    return { tooLarge: false, data: JSON.parse(Buffer.concat(chunks).toString('utf8')) }
  } catch {
    return { tooLarge: false, data: null }
  }
}
