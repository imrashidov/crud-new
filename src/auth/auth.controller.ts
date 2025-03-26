import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // /auth/signup (endpoint)
  @Post("signup")
  signup() {
    return "signup";
  }

  // /auth/signin (endpoint)
  @Post("signin")
  signin() {
    return "signin";
  }
}
