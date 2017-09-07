import constant from '../constant'
import String2Buffer from '../core/string2Buffer'
import AuthoricatorImpl from './authoricatorImpl'
export default class Authoricator {
  //引数なしコンストラクター
  constructor() {
  }
  //ログイン
  async signup(userId,passwd){
    this.impl = new AuthoricatorImpl(userId);
    await this.impl.waitInit();
    let tokenA = await this.impl.crateCryptKeyTokenA(passwd);
    let step1CryptKey = await this.impl.createStep1CrypytKey();
    let encrypted = await this.impl.encrypt(step1CryptKey,tokenA);
    await this.impl.saveKeys(this.impl.EncryptionTokenAKey,encrypted);
    return true;
  }
  //ログイン
  signin(userId,passwd){

  }
  //ログアウト
  signout(userId,passwd){

  }
  //ログイン
  activate(userId,passwd){
    this.impl = new AuthoricatorImpl(userId);
    await this.impl.waitInit();
    let step1CryptKey = await this.impl.createStep1CrypytKey();
    let encryptedTokenA = await this.impl.loadKeys(this.impl.EncryptionTokenAKey);
    let tokenA = await this.impl.decrypt(step1CryptKey,encryptedTokenA);
    let tokenB = await this.impl.crateCryptKeyTokenA(passwd,tokenA);
    let encryptedTokenB = await this.impl.encrypt(step1CryptKey,tokenB);
    let step2CryptKey = await this.impl.createStep2CrypytKey(passwd,tokenA,tokenB);
    let encrypted = await this.impl.encrypt(step2CryptKey,userId);
    await this.impl.saveKeys(this.impl.EncryptionTokenBKey,encryptedTokenB);
    await this.impl.saveKeys(this.impl.EncryptionUserIdKey,encrypted);
    return true;
  }

}
