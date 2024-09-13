import { db, Share, NOW } from 'astro:db';

export default async function seed() {
	await db.insert(Share).values({
		id: '0kNnKLmor8UVqFMMjwKtIE',
		url: '?artist=Baby%20Keem%20-%2016&results=youtube-music%3Dhttps%253A%252F%252Fmusic.youtube.com%252Fwatch%253Fv%253Ds529iTY777w',
		createdAt: NOW
	})
}
