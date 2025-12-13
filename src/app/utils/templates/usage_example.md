# EJS Usages

```code
await sendEmail({
  to: user.email,
  subject: "Welcome to ImgOptimiser 🎉",
  templateName: "welcome-user",
  templateData: {
    name: user.name,
    appName: "Dream Wallet",
    loginUrl: "http://localhost:3000/login",
    supportEmail: "support@imgoptimiser.org",
  },
});

```