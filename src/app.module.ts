import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
