import { defineDb, defineTable, column } from 'astro:db';

const Share = defineTable({
  columns: {
    id: column.text({ primaryKey: true }), // spotify trackId
    url: column.text(),
    image: column.text(),
    createdAt: column.date(),
  }
})

export default defineDb({
  tables: { Share },
});
