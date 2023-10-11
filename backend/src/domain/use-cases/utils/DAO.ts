export interface DAO<T, K> {
  findAll (): Array<T>
  findOne (key: K): Array<T>

  create (type: T): K
  update (type: T): K
  deleteByKey (key: K): T
  delete (type: T): T
}