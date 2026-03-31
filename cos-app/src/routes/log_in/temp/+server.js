import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import {eq, or} from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
    const { username, password } = await request.json();
    const [existingUser] = await db
        .select()
        .from(users)
        .where(or(eq(users.username, username), eq(users.email, username)));

    if (!existingUser) {
        return json({ success: false, error: 'no user' });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.passwordHash);
    if (!passwordMatch) {
        return json({ success: false, error: 'wrong password' });
    }


    if (existingUser.twoFactorEnabled) {
        return json({ success: true, requires2FA: true, userID: existingUser.id });
    }

    const sessionId = crypto.randomUUID();
    await db.update(users).set({ session_id: sessionId }).where(eq(users.id, existingUser.id));

    return json({ success: true, sessionId });
}