import fs from 'fs';
import { encryptPublicKey } from './encrypt.js'; // Ensure you are using named imports
import { decryptPrivateKey } from './decrypt.js'; // Use named import
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the public key
const publicKey = fs.readFileSync(`${__dirname}/id_rsa_pub.pem`, 'utf8');

// Encrypt the message
const encryptMsg = encryptPublicKey('This is secret', publicKey);
console.log('Encrypted Message:', encryptMsg.toString());

// Load the private key
const privateKey = fs.readFileSync(`${__dirname}/id_rsa_priv.pem`, 'utf8');

// Decrypt the message
const decryptedMsg = decryptPrivateKey(encryptMsg, privateKey);
console.log('Decrypted Message:', decryptedMsg.toString());
