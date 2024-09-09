import type { APIRoute } from "astro"

export const GET: APIRoute = async (request) => {
  const { url } = request
  const searchParams = new URL(url).searchParams

  const trackId = searchParams.get('track')

  try {
    const resp = await fetch(`https://api-alternify.vercel.app/track/${trackId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!resp.ok) {
      return new Response('Track not found', { status: 404 })
    }
    const data = await resp.json()
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Something went wrong'
    return new Response(JSON.stringify(message), { status: 404 })
  }
}
