import Admin from "../entity/Admin";
import Authority from "../entity/Authority";
import AuthorityEnum from "../common/enum/AuthorityEnum";
import { AdminRepository } from "../admin/admin.repository"
import bcrypt from "bcrypt"
import serverConfig from "./server.config";
import { AuthorityRepository } from "../authority/authority.repository"
import { Logger } from '@nestjs/common';

interface initAdminInfo {
    adminAccount: string,
    adminPassword: string,
    isRoot: boolean,
}

interface adminConfig {
    initialAdmins: initAdminInfo[];
}

const initialAdminConfig: adminConfig = {
    initialAdmins: [
        {
            adminAccount: "admin",
            adminPassword: "xieyu1688",
            isRoot: true
        }
    ]
}

/**
 * 根據AuthorityEnum, 同步enum內的所有role
 */
const initAuthority = async () => {
    let logger = new Logger("initAuthority");

    try {
        let keys = Object.keys(AuthorityEnum);
        console.log(`keys: ${JSON.stringify(keys)}`)
        console.log(`values: ${JSON.stringify(Object.values(AuthorityEnum))}`)
        let authorityRepository = new AuthorityRepository();
        for (let index = 0; index < keys.length; index++) {
            let role = keys[index];
            let authority = await authorityRepository.findOneByRole(role);
            if (!authority) {
                let newAuthority = new Authority();
                newAuthority.role = role;
                await newAuthority.save();
                logger.log(`added new role: ${role} success!`)
            } else {
                logger.log(`role: ${role} already exits, skip add it.`);
            }
        }
    } catch (error) {
        logger.error(error, "encountered error while sync authoriry");
        process.exit(1);
    }
}

const initAdmin = async (adminConfig: adminConfig) => {
    let logger = new Logger("initAdmin");
    await initAuthority();
    let adminRepository = new AdminRepository();
    let authorityRepository = new AuthorityRepository();
    for (let idx = 0; idx < adminConfig.initialAdmins.length; idx++) {
        let admin = await adminRepository.findOneByAccount(adminConfig.initialAdmins[idx].adminAccount);
        if (!admin) {
            let newAdmin = new Admin();
            newAdmin.account = adminConfig.initialAdmins[idx].adminAccount;
            newAdmin.password = await bcrypt.hash(adminConfig.initialAdmins[idx].adminPassword, serverConfig.saltRounds);
            if(adminConfig.initialAdmins[idx].isRoot){
                let authority = await authorityRepository.findOneByRole(AuthorityEnum[AuthorityEnum.ROOT]);
                newAdmin.authority = authority;
            } else {
                let authority = await authorityRepository.findOneByRole(AuthorityEnum[AuthorityEnum.ADMIN]);
                newAdmin.authority = authority;
            }
            await newAdmin.save();
            logger.log(`added new admin: ${adminConfig.initialAdmins[idx].adminAccount} success!`)
        } else {
            logger.log(`admin: ${adminConfig.initialAdmins[idx].adminAccount} already exits, skip add it.`)
        }
    }
}

export { initialAdminConfig, initAdmin }