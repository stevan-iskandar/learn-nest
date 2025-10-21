import { DataSource, QueryRunner } from "typeorm"

export class BaseService {
  constructor(
    protected readonly dataSource: DataSource,
  ) { }

  async executeInTransaction<T>(
    operation: (queryRunner: QueryRunner) => Promise<T>,
    queryRunner?: QueryRunner,
  ): Promise<T> {
    if (queryRunner) return await operation(queryRunner)

    const qr = this.dataSource.createQueryRunner()
    await qr.connect()
    await qr.startTransaction()

    try {
      const result = await operation(qr)

      await qr.commitTransaction()

      return result
    } catch (error) {
      await qr.rollbackTransaction()
      throw error
    } finally {
      await qr.release()
    }
  }
}