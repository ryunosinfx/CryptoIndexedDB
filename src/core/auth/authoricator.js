import constant from '../constant'
import String2Buffer from '../crypt/string2Buffer'
import AuthoricatorImpl from './authoricatorImpl'
const keys = {
  tokenA: undefined,
  tokenB: undefined,
  passwdHash: undefined,
  tokenD: undefined,
  step2CryptKey: undefined
};

export default class Authoricator {
  //引数なしコンストラクター
  constructor() {}
  //ユーザ登録
  async signupExecute(userId, passwd) {
    // console.log("Authoricator-signup--a001");
    this.impl = new AuthoricatorImpl(userId);
    // console.log("Authoricator-signup--a002");
    await this.impl.waitInit();
    // console.log("Authoricator-signup--a003");
    let tokenA = await this.impl.crateCryptKeyTokenA(passwd);
    // console.log("Authoricator-signup--a004");
    let step1CryptKey = await this.impl.createStep1CrypytKey(passwd);
    // console.log("Authoricator-signup--a005");
    let encrypted = await this.impl.encrypt(step1CryptKey, tokenA);
    // console.log("Authoricator-signup--a006");
    await this.impl.saveKeys(this.impl.EncryptionTokenAKey, encrypted);
    // console.log("Authoricator-signup--a007");
    return true;
  }
  //ユーザ登録
  async signup(userId, passwd) {
    let isActivate = await this.signin(userId, passwd);
    if(isActivate){
      return false;
    }
    // console.log("Authoricator-signup--a002");
    return await this.signupExecute(userId, passwd);
  }
  //ログイン
  async signin(userId, passwd) {
    return await this.isActivate(userId, passwd);
  }
  // ログイン済み確認
  async isLogedIn() {
    try {
      // console.log("Authoricator-isLogedIn--a001");
      let step2CryptKey = await this.impl.createStep2CrypytKey(keys.passwdHash, keys.tokenA, keys.tokenB);
      // console.log("Authoricator-isLogedIn--a002");
      let encryptedTokenD = await this.impl.loadKeys(this.impl.EncryptionUserIdKey);
      // console.log("Authoricator-isLogedIn--a003");
      let tokenD = await this.impl.decrypt(step2CryptKey, encryptedTokenD);
      // console.log("Authoricator-isLogedIn--a004");
      if (this.impl.isEqualDualAllayBuffers(keys.tokenD, tokenD)) {
        // console.log("Authoricator-isLogedIn--a005--isEqualDualAllayBuffers true");
        keys.step2CryptKey = step2CryptKey;
        return true;
      };
      throw this;
    } catch (e) {
      console.log(e);
      keys.tokenA = undefined;
      keys.tokenB = undefined;
      keys.passwdHash = undefined;
      keys.tokenD = undefined;
      keys.step2CryptKey = undefined;
      return false;
    }
  }
  //ログアウト
  signout() {
    keys.tokenA = undefined;
    keys.tokenB = undefined;
    keys.passwdHash = undefined;
    keys.tokenD = undefined;
    keys.step2CryptKey = undefined;
    return true;
  }

  async isActivate(userId, passwd) {
    this.impl = new AuthoricatorImpl(userId);
    // console.log("isActivate 001");
    await this.impl.waitInit();
    // console.log("isActivate 002");
    let step1CryptKey = await this.impl.createStep1CrypytKey(passwd);
    // console.log("isActivate 003");
    let encryptedTokenA = await this.impl.loadKeys(this.impl.EncryptionTokenAKey);
    // console.log("isActivate 004");
    let encryptedTokenB = await this.impl.loadKeys(this.impl.EncryptionTokenBKey);
    // console.log("isActivate 005");
    keys.passwdHash = await this.impl.createTokenC(passwd);
    // console.log("isActivate 006");
    keys.tokenD = await this.impl.createTokenD(passwd);
    // console.log("isActivate 007");
    try {
      // console.log("isActivate 02");
      keys.tokenA = await this.impl.decrypt(step1CryptKey, encryptedTokenA);
      // console.log("isActivate 03");
      keys.tokenB = await this.impl.decrypt(step1CryptKey, encryptedTokenB);
      // console.log("isActivate 04");
      let step2CryptKey = await this.impl.createStep2CrypytKey(keys.passwdHash, keys.tokenA, keys.tokenB);
      // console.log("isActivate 05");
      let encryptedTokenD = await this.impl.loadKeys(this.impl.EncryptionUserIdKey);
      // console.log("isActivate 026");
      let tokenD = await this.impl.decrypt(step2CryptKey, encryptedTokenD);
      if (this.impl.isEqualDualAllayBuffers(keys.tokenD, tokenD)) {
        return true;
      };
      throw this;
    } catch (e) {
      keys.tokenA = undefined;
      keys.tokenB = undefined;
      keys.passwdHash = undefined;
      keys.tokenD = undefined;
      keys.step2CryptKey = undefined;
      return false;
    }
    return false;
  }
  //登録処理
  async activate(userId, passwd) {
    // console.log("Activate!! 001");
    this.impl = new AuthoricatorImpl(userId);
    // console.log("Activate!! 002");
    await this.impl.waitInit();
    // console.log("Activate!! 003");
    let step1CryptKey = await this.impl.createStep1CrypytKey(passwd);
    // console.log("Activate!! 004");
    let encryptedTokenA = await this.impl.loadKeys(this.impl.EncryptionTokenAKey);
    // console.log("Activate!! 005");
    let tokenA = "";
    // console.log("Activate!! 006");
    try {
      tokenA = await this.impl.decrypt(step1CryptKey, encryptedTokenA);
      // console.log("Activate!! 007 tokenA:"+tokenA);
    } catch (e) {
      throw e;
    }
    let tokenB = await this.impl.crateCryptKeyTokenA(passwd, tokenA);
    // console.log("Activate!! 008 /"+( tokenB instanceof ArrayBuffer) +"/tokenB:"+tokenB);
    let encryptedTokenB = await this.impl.encrypt(step1CryptKey, tokenB);
    // console.log("Activate!! 009");
    let passwdHash = await this.impl.createTokenC(passwd);
    // console.log("Activate!! 010 /"+passwdHash.length+"/passwdHash:"+passwdHash);
    let step2CryptKey = await this.impl.createStep2CrypytKey(passwdHash, tokenA, tokenB);
    // console.log("Activate!! 011 step2CryptKey:"+step2CryptKey);
    let tokenD = await this.impl.createTokenD(passwd);
    // console.log("Activate!! 012 tokenD:"+tokenD);
    let encrypted = await this.impl.encrypt(step2CryptKey, tokenD);
    // console.log("Activate!! 013");
    await this.impl.saveKeys(this.impl.EncryptionTokenBKey, encryptedTokenB);
    // console.log("Activate!! 014");
    await this.impl.saveKeys(this.impl.EncryptionUserIdKey, encrypted);
    // console.log("Activate!! 015");
    return true;
  }

  async encrypt(data) {
    if (keys.step2CryptKey === undefined) {
      return null;
    }
    return await this.impl.encrypt(keys.step2CryptKey, data);
  }

  async decrypt(data) {
    if (keys.step2CryptKey === undefined) {
      return null;
    }
    try {
      return await this.impl.decrypt(keys.step2CryptKey, data);
    } catch (e) {
      throw e;
    }
  }

}
