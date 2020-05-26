import { Injectable, Logger } from '@nestjs/common';
import AuthError from "../common/error/AuthError";
import AuthFailureReasonEnum from "../common/enum/AuthFailureReasonEnum";
import bcrypt from "bcrypt"
import { classToPlain } from "class-transformer";
import jwt from "jsonwebtoken";
import AdminRepository from "../admin/admin.repository";
import key from "../config/key";

@Injectable()
export class AdminService {
    private readonly logger = new Logger(AdminService.name);

    signIn(account: string, password: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!account || !password) {
                    reject(new AuthError(AuthFailureReasonEnum.BAD_REQUEST));
                }

                let admin = await AdminRepository.findOneByAccount(account);

                if (admin) {
                    let isCorrect = await bcrypt.compare(password, admin.password);
                    if (isCorrect) {
                        let adminDto = classToPlain(admin); //濾掉私密的欄位
                        jwt.sign( { admin: adminDto } , key.privateKey, { algorithm: 'RS256' }, (error, token) => {
                            if (error) {
                                this.logger.error(error, "got error when sign admin jtw. maybe it has problems with private key file (path:/key/**.key)");
                                reject(new AuthError(AuthFailureReasonEnum.INTERNAL_SERVER_ERROR));
                            }
                            if (token) {
                                resolve(token);
                            }
                        })
                    } else {
                        reject(new AuthError(AuthFailureReasonEnum.INVALID_USER));
                    }
                } else {
                    //帳密錯誤的會到這
                    //TODO: 不論帳號是否存在 都累加錯誤次數
                    reject(new AuthError(AuthFailureReasonEnum.INVALID_USER));
                }
            } catch (error) {
                this.logger.error(error, "got error while auth signin");
                reject(new AuthError(AuthFailureReasonEnum.INTERNAL_SERVER_ERROR));
            }
        })
    }
}
