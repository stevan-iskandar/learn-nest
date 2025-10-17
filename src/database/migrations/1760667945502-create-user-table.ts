import { userColumn, userTable } from "@/app/domain/system/user/entities/user.entity"
import columnType from "@/constants/columnType"
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1760667945502 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: userTable,
            columns: [
                {
                    name: userColumn.id,
                    type: columnType.bigInt,
                    isPrimary: true,
                    unsigned: true,
                },
                {
                    name: userColumn.first_name,
                    type: columnType.varchar,
                },
                {
                    name: userColumn.last_name,
                    type: columnType.varchar,
                },
                {
                    name: userColumn.active,
                    type: columnType.boolean,
                    default: true,
                },
                {
                    name: userColumn.created_by_id,
                    type: columnType.boolean,
                    isNullable: true,
                },
                {
                    name: userColumn.updated_by_id,
                    type: columnType.boolean,
                    isNullable: true,
                },
                {
                    name: userColumn.created_at,
                    type: columnType.datetime,
                },
                {
                    name: userColumn.updated_at,
                    type: columnType.datetime,
                },
                {
                    name: userColumn.deleted_at,
                    type: columnType.datetime,
                    isNullable: true,
                },
            ],
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(userTable)
    }

}
