import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      phone: user.phone,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Nomor telepon sudah terdaftar");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      phone: true,
      name: true,
      age: true,
      address: true,
      longitude: true,
      latitude: true,
      password: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      phone: loginRequest.phone,
    },
    select: {
      phone: true,
      password: true,
      isVerified: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Nomor telepon atau Password salah");
  }

  if (user.isVerified !== true) {
    throw new ResponseError(401, "Nomor Telepon Belum Di Verifikasi");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Nomor telepon atau Password salah");
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      phone: user.phone,
    },
    select: {
      phone: true,
      name: true,
      token: true,
    },
  });
};

export default {
  register,
  login,
};
