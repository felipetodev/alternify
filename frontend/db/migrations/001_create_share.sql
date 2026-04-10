CREATE TABLE IF NOT EXISTS share (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TEXT NOT NULL CHECK (
    length(created_at) = 10
    AND substr(created_at, 5, 1) = '-'
    AND substr(created_at, 8, 1) = '-'
  )
);

CREATE INDEX IF NOT EXISTS idx_share_created_at ON share(created_at DESC);
