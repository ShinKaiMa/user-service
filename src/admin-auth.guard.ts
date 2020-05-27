import { CanActivate, ExecutionContext, Injectable, Logger, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import AuthError from "./common/error/AuthError";
import { AdminService } from "./admin/admin.service";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private adminService: AdminService) { }
  private readonly logger = new Logger(AdminAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve, reject) => {
      let request = null;
      try {
        request = context.switchToHttp().getRequest();
        let account = request.body.account;
        let password = request.body.password;
        let token = await this.adminService.signIn(account, password);
        request.json({ token });
      } catch (error) {
        if (error instanceof AuthError) {
          request.status(HttpStatus.UNAUTHORIZED);
          request.json({ message: error.message })
        } else {
          this.logger.error(error, "got unhandled error while admin sigin");
          request.status(HttpStatus.INTERNAL_SERVER_ERROR);
          request.json({ message: "something went wrong." })
        }
      }
    })
  }


}
