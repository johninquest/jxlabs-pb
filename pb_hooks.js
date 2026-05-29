// pb_hooks.js
// Env vars are accessed via $os.getenv()
// The keys here correspond to the part AFTER POCKETBASE_APP_ENV_
const DEFAULT_ADMIN_EMAIL = $os.getenv("POCKETBASE_APP_ENV_ADMIN_EMAIL");
const DEFAULT_ADMIN_PASSWORD = $os.getenv("POCKETBASE_APP_ENV_ADMIN_PASSWORD");

onBeforeServe((e) => {
    // Only attempt to create if environment variables are set
    if (!DEFAULT_ADMIN_EMAIL || !DEFAULT_ADMIN_PASSWORD) {
        console.log("⚠️ Skipping default superuser creation: DB_ADMIN_USER or DB_ADMIN_PASSWORD not set in environment.");
        e.next();
        return;
    }

    try {
        const existing = $app.findRecordsByFilter("_superusers", "email = {:email}", "-created", 1, 0, { email: DEFAULT_ADMIN_EMAIL });
        if (existing.length === 0) {
            const record = new Record($app.findCollectionByNameOrId("_superusers"));
            record.set("email", DEFAULT_ADMIN_EMAIL);
            record.set("password", DEFAULT_ADMIN_PASSWORD);
            record.set("passwordConfirm", DEFAULT_ADMIN_PASSWORD);
            $app.save(record);
            console.log(`✅ Default superuser created: ${DEFAULT_ADMIN_EMAIL}`);
        } else {
            console.log(`ℹ️ Superuser already exists. Skipping default superuser creation.`);
        }
    } catch (err) {
        console.error(`❌ Error creating default superuser: ${err}`);
    }

    e.next();
});