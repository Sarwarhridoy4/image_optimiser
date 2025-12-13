// src/app/database/seedAdmin.ts
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../modules/users/user.model.js";
import { UserRole } from "../modules/users/user.interface.js";
import { UserProfile } from "../modules/profile/profile.model.js";

export const seedAdmin = async (): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";

    const exists = await User.findOne({ email: adminEmail }).session(session);
    if (exists) {
      console.log("Admin already exists. Skipping seed.");
      await session.abortTransaction();
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD ?? "Admin@123",
      12
    );

    // 1️⃣ Create User WITHOUT profile
    const [user] = await User.create(
      [
        {
          name: "Super Admin",
          email: adminEmail,
          password: hashedPassword,
          role: UserRole.ADMIN,
        },
      ],
      { session }
    );

    if (!user) {
      throw new Error("Failed to create admin user");
    }

    // 2️⃣ Create Profile WITH user reference
    const [profile] = await UserProfile.create(
      [
        {
          user: user._id,
          profilePic: "https://cdn.example.com/admin/profile.png",
          certificatePdf: "https://cdn.example.com/admin/certificate.pdf",
        },
      ],
      { session }
    );

    if (!profile) {
      throw new Error("Failed to create user profile");
    }

    // 3️⃣ Update user.profile
    user.profile = profile._id;
    await user.save({ session });

    await session.commitTransaction();
    console.log("Admin seeded successfully");
  } catch (error) {
    await session.abortTransaction();
    console.error("Admin seeding failed:", error);
  } finally {
    session.endSession();
  }
};
