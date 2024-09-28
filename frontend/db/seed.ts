import { db, Share, NOW } from 'astro:db';

export default async function seed() {
	await db.insert(Share).values({
		id: '0kNnKLmor8UVqFMMjwKtIE',
		url: '?artist=Baby%20Keem%20-%2016&results=youtube-music%3Dhttps%253A%252F%252Fmusic.youtube.com%252Fwatch%253Fv%253Ds529iTY777w',
		image: 'https://i.scdn.co/image/ab67616d0000b273f3b8bac4ec47a6fb1fa626da',
		createdAt: NOW
	})
}
