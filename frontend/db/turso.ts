import { createClient } from "@libsql/client";

const tursoUrl = import.meta.env.TURSO_DATABASE_URL;

if (!tursoUrl) {
  throw new Error("Missing TURSO_DATABASE_URL");
}

export interface ShareRecord {
  id: string;
  url: string;
  image: string;
  createdAt: string;
}

export const turso = createClient({
  url: tursoUrl,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
});

const toDateOnly = (date = new Date()) => date.toISOString().slice(0, 10);

const mapShareRow = (row: Record<string, unknown>): ShareRecord => ({
  id: String(row.id ?? ""),
  url: String(row.url ?? ""),
  image: String(row.image ?? ""),
  createdAt: String(row.created_at ?? ""),
});

export async function insertShare(input: {
  id: string;
  url: string;
  image: string;
  createdAt?: string;
}) {
  return turso.execute({
    sql: `
      INSERT OR IGNORE INTO share (id, url, image, created_at)
      VALUES (?, ?, ?, ?)
    `,
    args: [input.id, input.url, input.image, input.createdAt ?? toDateOnly()],
  });
}

export async function getShareById(id: string): Promise<ShareRecord | null> {
  const result = await turso.execute({
    sql: `
      SELECT id, url, image, created_at
      FROM share
      WHERE id = ?
      LIMIT 1
    `,
    args: [id],
  });

  if (result.rows.length === 0) return null;
  return mapShareRow(result.rows[0] as Record<string, unknown>);
}

export async function getLatestShares(limit = 10): Promise<ShareRecord[]> {
  const normalizedLimit = Math.max(1, Math.floor(limit));
  const result = await turso.execute({
    sql: `
      SELECT id, url, image, created_at
      FROM share
      ORDER BY created_at DESC
      LIMIT ?
    `,
    args: [normalizedLimit],
  });

  return result.rows.map((row) => mapShareRow(row as Record<string, unknown>));
}
