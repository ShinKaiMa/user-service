import fs from 'fs';
import path from 'path';
let privateKeyPath = path.join(__dirname, '..', '..', 'key', 'xieyu-ec.key');
let publicKeyPath = path.join(__dirname, '..', '..', 'key', 'xieyu-ec.key.pub');
let privateKey = fs.readFileSync(privateKeyPath);
let publicKey = fs.readFileSync(publicKeyPath);

export default {
    privateKey,
    publicKey
}