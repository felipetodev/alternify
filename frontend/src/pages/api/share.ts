import type { APIRoute } from "astro";
import { insertShare } from "../../../db/turso";
import { validateShareRequest } from "@/lib/schemas";

export const POST: APIRoute = async ({ request }) => {
  const { id, url, image = '' } = await request.json()

  const params = new URLSearchParams(url)
  const result = validateShareRequest(id, params)

  if (!result.success) {
    console.error(result.error.errors)
    return new Response('Invalid credentials', { status: 400 })
  }

  try {
    await insertShare({
      id,
      url,
      image,
    })

    return new Response('', { status: 200 })
  } catch (e) {
    console.error(e)
    return new Response('Error generating social url', { status: 500 })
  }
}
