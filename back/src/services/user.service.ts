import LoginUserDto from "../dtos/loginUser.dto";
import RegisterUserDto from "../dtos/registerUser.dto";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/user.repository";
import { ClientError } from "../utils/errors";
import {
  checkPasswordService,
  createCredentialService,
} from "./credential.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

export const checkOrCreateUserService = async (auth0Sub: string, email: string, name: string): Promise<User> => {
  let user = await UserRepository.findOneBy({ auth0Sub });
  if (!user) {
    user = await UserRepository.create({ auth0Sub, email, name, isRegistered: false });
    await UserRepository.save(user);
  }
  return user;
};

export const checkUserExists = async (auth0Sub: string): Promise<boolean> => {
  const user = await UserRepository.findOneBy({ auth0Sub });
  return !!user;
};

export const registerUserService = async (
  registerUserDto: RegisterUserDto & { auth0Sub: string }
): Promise<User> => {
  const { auth0Sub, address, phone } = registerUserDto;

  let user = await UserRepository.findOne({
    where: { auth0Sub },
    relations: ["credential"],
  });

  if (!user) {
    throw new Error("User not found for registration.");
  }

  user.address = address;
  user.phone = phone;

  if (!user.credential) {
    const credential = await createCredentialService({ password: auth0Sub });
    user.credential = credential;
    user.isRegistered = true;
  }

  await UserRepository.save(user);

  return user;
};

export const loginUserService = async (
  loginUserDto: LoginUserDto
): Promise<{ token: string; user: User }> => {
  const user: User | null = await UserRepository.findOne({
    where: {
      email: loginUserDto.email,
    },
    relations: ["credential", "orders"],
  });
  if (!user) throw new Error("User not found");
  if (
    await checkPasswordService(loginUserDto.password, user.credential.password)
  ) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    return {
      user,
      token,
    };
  } else {
    throw new ClientError("Invalid password");
  }
};
