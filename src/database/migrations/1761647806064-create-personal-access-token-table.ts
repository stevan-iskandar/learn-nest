import { personalAccessTokenColumn, personalAccessTokenTable } from "@/app/domain/system/personal-access-token/entities/personal-access-token.entity"
import columnType from "@/constants/columnType"
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePersonalAccessTokenTable1761647806064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: personalAccessTokenTable,
            columns: [
                {
                    name: personalAccessTokenColumn.id,
                    type: columnType.bigInt,
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: personalAccessTokenColumn.user_id,
                    type: columnType.bigInt,
                    unsigned: true,
                },
                {
                    name: personalAccessTokenColumn.name,
                    type: columnType.varchar,
                },
                {
                    name: personalAccessTokenColumn.token,
                    type: columnType.varchar,
                },
                {
                    name: personalAccessTokenColumn.abilities,
                    type: columnType.json,
                },
                {
                    name: personalAccessTokenColumn.last_used_at,
                    type: columnType.datetime,
                    isNullable: true,
                },
                {
                    name: personalAccessTokenColumn.expired_at,
                    type: columnType.datetime,
                },
                {
                    name: personalAccessTokenColumn.created_by_id,
                    type: columnType.boolean,
                    isNullable: true,
                    unsigned: true,
                },
                {
                    name: personalAccessTokenColumn.updated_by_id,
                    type: columnType.boolean,
                    isNullable: true,
                    unsigned: true,
                },
                {
                    name: personalAccessTokenColumn.created_at,
                    type: columnType.datetime,
                    default: 'now()',
                },
                {
                    name: personalAccessTokenColumn.updated_at,
                    type: columnType.datetime,
                    default: 'now()',
                },
            ],
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(personalAccessTokenTable)
    }

}
