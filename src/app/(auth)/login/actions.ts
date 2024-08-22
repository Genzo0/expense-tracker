"use server";

import { loginSchema, LoginValue } from "@/lib/validations";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/auth";
import { verify } from "@node-rs/argon2";

export async function login(
  credentials: LoginValue,
): Promise<{ error: string }> {
  try {
    const { email, password } = loginSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser || !existingUser.passwordHash) {
      return { error: "Email atau password salah" };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return { error: "Email atau password salah" };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    console.log(error);
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
