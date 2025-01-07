import crypto from 'crypto';

export const encryptPublicKey = (message, publicKey) => {
    const bufferMsg = Buffer.from(message, 'utf8');
    return crypto.publicEncrypt(publicKey, bufferMsg);
}

export const encryptPrivateKey = (message, privateKey) => {
    const bufferMsg = Buffer.from(message, 'utf8');
    return crypto.privateEncrypt(privateKey, bufferMsg);
}
