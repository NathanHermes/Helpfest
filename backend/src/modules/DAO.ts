export interface DAO<T, K> {
  findAll(): Array<T>
  findOne(key: K): Promise<T | undefined>

  create(type: T): Promise<K>
  update(key: K, type: T): Promise<K>
  delete(type: T): Promise<T>
}