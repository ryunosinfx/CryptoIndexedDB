import DBScanner from './core/dbScanner'
import EntityManager from './enity/entityManager'
import TranzactionManager from './enity/TranzactionManager'
import Query from './enity/query/query'

const dbScanner = new DBScanner();
export default class Functions {
  constructor() {
  }
  static async signup(userId, passwd) {
    return await dbScanner.signup(userId, passwd);
  }
  static async signin(userId, passwd) {
    return await dbScanner.signin(userId, passwd);
  }
  static async isLogedIn() {
    return await dbScanner.isLogedIn();
  }
  static signout() {
    return await dbScanner.signout();
  }
  static async isActivate(userId, passwd) {
    return await dbScanner.isActivate(userId, passwd);
  }
  static async activate(userId, passwd) {
    return await dbScanner.activate(userId, passwd);
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
