import Admin from "../entity/Admin"
import {getRepository} from "typeorm";
import { Logger } from "@nestjs/common";

export default class AdminRepository {
    private readonly logger = new Logger(AdminRepository.name);

    public static async findOneByPhoneNumer(phoneNumber:string): Promise<Admin> {
        return new Promise(async (resolve, reject) => {
            try {
                let adminRepository = await getRepository(Admin);
                let admins = await adminRepository.find({where: {phoneNumber}, take:1});
                resolve(admins[0]);
            } catch (error) {
                reject(error);
            }
        })
    }

    public static async findOneByAccount(account:string): Promise<Admin> {
        return new Promise(async (resolve, reject) => {
            try {
                let adminRepository = await getRepository(Admin);
                let admins = await adminRepository.find({where: {account}, take:1});
                resolve(admins[0]);
            } catch (error) {
                reject(error);
            }
        })
    }
}
