// pb_hooks.js
const DEFAULT_ADMIN_EMAIL = "johninquest@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "?borodb97";

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
