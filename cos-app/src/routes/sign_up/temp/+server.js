import { db } from '$lib/server/db';
import { temp_users } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { generate2FASecret, generateQRCode } from '$lib/server/two_factor_auth';
import { eq, sql } from 'drizzle-orm';


const SALT_ROUNDS = 10;

export async function POST({ request }) {
    await db.delete(temp_users)
        .where(sql`created_at < NOW() - INTERVAL '5 minutes'`);
    const { email, username, password } = await request.json();

    const existingTempUser = await db.query.temp_users.findFirst({
        where: sql`username = ${username} AND created_at > NOW() - INTERVAL '5 minutes'`
    });

    const existingUser = await db.query.users.findFirst({
        where: sql`username = ${username}`
    });

    const existingTempEmail = await db.query.temp_users.findFirst({
        where: sql`email = ${email} AND created_at > NOW() - INTERVAL '5 minutes'`
    })

    const existingEmail = await db.query.users.findFirst({
        where: sql`email = ${email}`
    })

    if (existingTempUser || existingUser) {
        return json({ success: false, error: 'Username already taken' });
    }
    if (existingTempEmail || existingEmail) {
        return json({ success: false, error: 'Email already taken' });
    }

    if (!username || !password) return json({ success: false, error: 'Missing data' });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    try {
        const newUser = await db.insert(temp_users)
            .values({ username, passwordHash: passwordHash, email})
            .returning();

        const tempUser = newUser[0];

        const secret = generate2FASecret(username);

        const qrCode = await generateQRCode(secret.otpauth_url);

        await db.update(temp_users)
            .set({twoFactorSecret: secret.base32})
            .where(eq(temp_users.id, tempUser.id));

        return json({
            success: true,
            tempUserId: tempUser.id,
            qrCode
        });
    } catch (err) {
        if (err.message.includes('duplicate key')) {
            return json({ success: false, error: 'Username already exists' });
        }
        return json({ success: false, error: err.message });
    }
}