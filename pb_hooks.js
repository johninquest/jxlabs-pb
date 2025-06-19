// pb_hooks.js
// Access environment variables through the `pb.env` object
// The keys here correspond to the part AFTER POCKETBASE_APP_ENV_
const DEFAULT_ADMIN_EMAIL = pb.env.ADMIN_EMAIL;
const DEFAULT_ADMIN_PASSWORD = pb.env.ADMIN_PASSWORD;

pb.on("beforeServe", async () => {
    // Only attempt to create if environment variables are set
    if (!DEFAULT_ADMIN_EMAIL || !DEFAULT_ADMIN_PASSWORD) {
        console.log("⚠️ Skipping default admin creation: DB_ADMIN_USER or DB_ADMIN_PASSWORD not set in environment.");
        return;
    }

    const admins = await pb.admins.getFullList();
    if (admins.length === 0) {
        try {
            await pb.admins.create({
                email: DEFAULT_ADMIN_EMAIL,
                password: DEFAULT_ADMIN_PASSWORD,
                passwordConfirm: DEFAULT_ADMIN_PASSWORD,
            });
            console.log(`✅ Default admin created: ${DEFAULT_ADMIN_EMAIL}`);
        } catch (e) {
            console.error(`❌ Error creating default admin: ${e.message}`);
        }
    } else {
        console.log(`ℹ️ Admin already exists. Skipping default admin creation.`);
    }
});