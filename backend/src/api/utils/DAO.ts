export interface DAO<T, K> {
  findAll (): Array<T>
  findOne (key: K): T | undefined

  create (type: T): Promise<K>
  update (key: K, type: T): Promise<K>
  deleteByKey (key: K): Promise<T>
  delete (type: T): Promise<T>
}