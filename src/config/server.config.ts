const serverconfig = {
    port: 8080,
    corsOrigin: ["http://localhost:3000"],
    saltRounds: 12, //bcrypt salt rounds
    adminExpirationDay: 30,
    memberExpirationDay: 30,
}


export default {
    ...serverconfig,
}