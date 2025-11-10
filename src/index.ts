import app from "./app";

const PORT = process.env.PORT || 3000;

// Only listen locally; Vercel handles the listener in production
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ ICON48 backend API running on http://localhost:${PORT}`);
  });
}

export default app;

