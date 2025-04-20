import { Injectable, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { AuthDto } from "./dto";

interface User {
  id: number;
  email: string;
  hash: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Temporary in-memory storage
const users = new Map<number, User>();

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    const user: User = {
      id: users.size + 1,
      email: dto.email,
      hash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.set(user.id, user);

    const token = await this.signToken(user.id, user.email);

    return {
      access_token: token,
    };
  }

  async signin(dto: AuthDto) {
    const user = Array.from(users.values()).find((u) => u.email === dto.email);

    if (!user) {
      throw new ForbiddenException("User not found");
    }

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException("Invalid credentials");
    }

    const token = await this.signToken(user.id, user.email);

    return {
      access_token: token,
    };
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: "15m",
    });
  }
}
