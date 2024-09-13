import type { APIRoute } from "astro"
import { API_BASE_URL } from "../../lib/constants"
import { validateTrackId } from '../../lib/schemas'

export const GET: APIRoute = async (request) => {
  const { url } = request
  const searchParams = new URL(url).searchParams

  const trackId = searchParams.get('track') ?? undefined

  const result = validateTrackId(trackId)

  if (!result.success) {
    console.error(result.error.errors)
    return new Response('Invalid credentials', { status: 400 })
  }

  try {
    const resp = await fetch(`${API_BASE_URL}/track/${trackId}`, {
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
