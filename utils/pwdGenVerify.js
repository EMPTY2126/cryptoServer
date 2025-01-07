import crypto from "crypto";

export const genHS= (password)=>
{
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: genHash
    }
}

export const verifyHS = (password,hash,salt)=>{
    var hashverify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return (hash === hashverify);
}
