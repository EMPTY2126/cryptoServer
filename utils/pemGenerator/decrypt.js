import crypto from 'crypto';

export const decryptPrivateKey = (encyMsg, privateKey) => {
    return crypto.privateDecrypt(privateKey, encyMsg);
}

export const decryptPublicKey = (encyMsg, publicKey) => {
    return crypto.publicDecrypt(publicKey, encyMsg);
}
