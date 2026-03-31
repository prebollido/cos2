import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { verify2FACode } from '$lib/server/two_factor_auth';



export async function POST({ request }) {
    const { userID, code } = await request.json();
    if (!userID || !code) {
        return json({ success: false, error: 'Temp user ID missing or code missing' });
    }

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, Number(userID)))

    if (!user) {
        return json({ success: false, error: 'Temp user not found' });
    }

    const valid = verify2FACode(user.twoFactorSecret, code);
    if(!valid){
        return json({success: false, error: "Invalid 2FA code"});
    }
    try {
        // rewrite session id
        const newSessionId = crypto.randomUUID();
        await db
            .update(users)
            .set({
                session_id: newSessionId,
            })
            .where(eq(users.id, userID))

        return json({ success: true });
    } catch (err) {
        console.error(err);
        return json({ success: false, error: err.message });
    }
}