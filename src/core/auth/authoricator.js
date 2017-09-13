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
  //ログイン
  async signup(userId, passwd) {
    console.log("Authoricator-signup--a001");
    this.impl = new AuthoricatorImpl(userId);
      console.log("Authoricator-signup--a002");
    await this.impl.waitInit();
      console.log("Authoricator-signup--a003");
    let tokenA = await this.impl.crateCryptKeyTokenA(passwd);
      console.log("Authoricator-signup--a004");
    let step1CryptKey = await this.impl.createStep1CrypytKey();
      console.log("Authoricator-signup--a005");
    let encrypted = await this.impl.encrypt(step1CryptKey, tokenA);
      console.log("Authoricator-signup--a006");
    await this.impl.saveKeys(this.impl.EncryptionTokenAKey, encrypted);
      console.log("Authoricator-signup--a007");
    return true;
  }
  //ログイン
  async signin(userId, passwd) {
    return await this.isActivate(userId, passwd);
  }
  async isLogedIn() {
    try {
      let step2CryptKey = await this.impl.createStep2CrypytKey(keys.passwdHash, keys.tokenA, keys.tokenB);
      let encryptedTokenD = await this.impl.loadKeys(this.impl.EncryptionUserIdKey);
      let tokenD = await this.impl.decrypt(step2CryptKey, encryptedTokenD);
      if (this.impl.isEqualDualAllayBuffers(keys.tokenD, tokenD)) {

        keys.step2CryptKey = step2CryptKey;
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
  }
  //ログアウト
  signout() {
    keys.tokenA = undefined;
    keys.tokenB = undefined;
    keys.passwdHash = undefined;
    keys.tokenD = undefined;
    keys.step2CryptKey = undefined;
  }

  async isActivate(userId, passwd) {
    this.impl = new AuthoricatorImpl(userId);
    await this.impl.waitInit();
    let step1CryptKey = await this.impl.createStep1CrypytKey(passwd);
    let encryptedTokenA = await this.impl.loadKeys(this.impl.EncryptionTokenAKey);
    let encryptedTokenB = await this.impl.loadKeys(this.impl.EncryptionTokenBKey);
    keys.passwdHash = await this.impl.createTokenC(passwd);
    keys.tokenD = await this.impl.createTokenD();
    try {
      keys.tokenA = await this.impl.decrypt(step1CryptKey, encryptedTokenA);
      keys.tokenB = await this.impl.decrypt(step1CryptKey, encryptedTokenB);
      let step2CryptKey = await this.impl.createStep2CrypytKey(keys.passwdHash, keys.tokenA, keys.tokenB);
      let encryptedTokenD = await this.impl.loadKeys(this.impl.EncryptionUserIdKey);
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
  //ログイン
  async activate(userId, passwd) {
    this.impl = new AuthoricatorImpl(userId);
    await this.impl.waitInit();
    let step1CryptKey = await this.impl.createStep1CrypytKey(passwd);
    let encryptedTokenA = await this.impl.loadKeys(this.impl.EncryptionTokenAKey);
    let tokenA ="";
    try{
      tokenA = await this.impl.decrypt(step1CryptKey, encryptedTokenA);
    }catch(e){
      throw e;
    }
    let tokenB = await this.impl.crateCryptKeyTokenA(passwd, tokenA);
    let encryptedTokenB = await this.impl.encrypt(step1CryptKey, tokenB);
    this.passwdHash = await this.impl.createTokenC(passwd);
    let step2CryptKey = await this.impl.createStep2CrypytKey(this.passwdHash, tokenA, tokenB);
    let tokenD = await this.impl.createTokenD();
    let encrypted = await this.impl.encrypt(step2CryptKey, this.tokenD);
    await this.impl.saveKeys(this.impl.EncryptionTokenBKey, encryptedTokenB);
    await this.impl.saveKeys(this.impl.EncryptionUserIdKey, encrypted);
    return true;
  }

  async encrypt(data){
    if(keys.step2CryptKey === undefined){
      return null;
    }
    return await this.impl.encrypt(keys.step2CryptKey, data);
  }

  async decrypt(data){
    if(keys.step2CryptKey === undefined){
      return null;
    }
    try{
      return await this.impl.decrypt(keys.step2CryptKey, data);
    }catch(e){
      throw e;
    }
  }

}
