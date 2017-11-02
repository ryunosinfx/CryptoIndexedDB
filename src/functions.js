import DBScanner from './core/dbScanner'
import EntityManager from './enity/entityManager'
import TranzactionManager from './enity/TranzactionManager'
import Query from './enity/query/query'

const dbScanner = new DBScanner();
export default class Functions {
  constructor() {
  }
  async signup(userId, passwd) {
    return await authoricator.signup(userId, passwd);
  }
  async signin(userId, passwd) {
    await authoricator.signin(userId, passwd);
    let isLogedIn = await this.isLogedIn();
    let isActivate = await this.isActivate(userId, passwd);
    if (isLogedIn && isActivate) {
      await this.fullLoad();
      return true;
    }
    this.deleteAllDataAtLogout();
    return false;
  }
  async isLogedIn() {
    return await authoricator.isLogedIn();
  }
  signout() {
    this.deleteAllDataAtLogout();
    return await authoricator.signout();
  }
  async isActivate(userId, passwd) {
    return await authoricator.isActivate(userId, passwd);
  }
  async activate(userId, passwd) {
    return await authoricator.activate(userId, passwd);
  }
  static async createQuery(isOnTranzaction) {
    if (await dbScanner.isLogiedIn()) {
      return new Query(isOnTranzaction, dbScanner);
    }
    return null;
  }
  static async createEntityManager(isOnTranzaction) {
    if (await dbScanner.isLogiedIn()) {
      return isOnTranzaction ? new TranzactionManager(dbScanner) : new EntityManager(dbScanner);;
    }
    return null;
  }
  static async createTranzactionManager(isOnTranzaction) {
      return Functions.createEntityManager(isOnTranzaction);
  }
}
