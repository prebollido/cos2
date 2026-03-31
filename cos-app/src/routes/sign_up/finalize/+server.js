import { db } from '$lib/server/db';
import { temp_users } from '$lib/server/db/schema.js';
import { users } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { verify2FACode } from '$lib/server/two_factor_auth';



export async function POST({ request }) {
    const { tempUserId, code } = await request.json();
    if (!tempUserId || !code) {
        return json({ success: false, error: 'Temp user ID missing or code missing' });
    }

        const [tempUser] = await db
            .select()
            .from(temp_users)
            .where(eq(temp_users.id, Number(tempUserId)))

    if (!tempUser) {
        return json({ success: false, error: 'Temp user not found' });
    }

    const valid = verify2FACode(tempUser.twoFactorSecret, code);
    if(!valid){
        return json({success: false, error: "Invalid 2FA code"});
    }
    try {
        // create permanent user
        const sessionId = crypto.randomUUID();
        await db.insert(users).values({
            username: tempUser.username,
            passwordHash: tempUser.passwordHash,
            verified: true,
            session_id: sessionId,
            twoFactorSecret: tempUser.twoFactorSecret,
            twoFactorEnabled: true,
            email: tempUser.email
        });

        // delete temp user
        await db.delete(temp_users).where(eq(temp_users.id, tempUser.id));

        return json({ success: true });
    } catch (err) {
        console.error(err);
        return json({ success: false, error: err.message });
    }
}