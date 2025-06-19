// pb_hooks.js
const DEFAULT_ADMIN_EMAIL = process.env.DB_ADMIN_USER;
const DEFAULT_ADMIN_PASSWORD = process.env.DB_ADMIN_PASSWORD;

pb.on("beforeServe", async () => {
    const admins = await pb.admins.getFullList();
    if (admins.length === 0) {
        await pb.admins.create({
            email: DEFAULT_ADMIN_EMAIL,
            password: DEFAULT_ADMIN_PASSWORD,
            passwordConfirm: DEFAULT_ADMIN_PASSWORD,
        });
        console.log(`✅ Default admin created: ${DEFAULT_ADMIN_EMAIL}`);
    }
});
