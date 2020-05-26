import Authority from "../entity/Authority"
import { getRepository } from "typeorm";
import { Logger } from "@nestjs/common";


export default class AuthorityRepository {
    public static async findOneByRole(role: string): Promise<Authority> {
        return new Promise(async (resolve, reject) => {
            try {
                let authorityRepository = await getRepository(Authority);
                let authorities = await authorityRepository.find({where: {role}, take:1});
                resolve(authorities[0]);
            } catch (error) {
                reject(error);
            }
        })
    }
}
