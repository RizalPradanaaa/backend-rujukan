import { prismaClient } from "../application/database.js";
import { nanoid } from "nanoid";
import axios from "axios";

export const requestOtp = async (phone) => {
  const user = await prismaClient.user.findUnique({ where: { phone } });
  if (!user) {
    throw new Error("Nomor tidak ditemukan");
  }

  const otp = nanoid(6).toUpperCase();
  const expires = new Date(Date.now() + 5 * 60 * 1000); // OTP berlaku 5 menit

  await prismaClient.user.update({
    where: { phone },
    data: {
      kodeOtp: otp,
      otpExpiresAt: expires,
      otpAttempts: 0,
    },
  });

  await axios.post(
    "https://api.fonnte.com/send",
    new URLSearchParams({
      target: phone,
      message: `Kode OTP kamu adalah: ${otp}. Berlaku 5 menit.`,
    }),
    {
      headers: {
        Authorization: process.env.FONNTE_KEY,
      },
    }
  );

  return true;
};

export const verifyOtp = async (phone, otp) => {
  const user = await prismaClient.user.findUnique({ where: { phone } });
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const now = new Date();

  if (user.otpAttempts >= 3) {
    throw new Error("Terlalu banyak percobaan. Minta ulang OTP.");
  }

  if (!user.otpExpiresAt || now > user.otpExpiresAt) {
    throw new Error("OTP kadaluarsa. Silakan minta ulang.");
  }

  if (user.kodeOtp !== otp) {
    await prismaClient.user.update({
      where: { phone },
      data: {
        otpAttempts: { increment: 1 },
      },
    });
    throw new Error(`Kode OTP salah. Sisa percobaan: ${2 - user.otpAttempts}`);
  }

  await prismaClient.user.update({
    where: { phone },
    data: {
      isVerified: true,
      kodeOtp: null,
      otpExpiresAt: null,
      otpAttempts: 0,
    },
  });

  return true;
};
