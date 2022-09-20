import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterDBTimeZone1663698038370 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER DATABASE api_vendas SET timezone TO 'America/Sao_Paulo'`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER DATABASE api_vendas SET timezone TO 'etc/UTC'`,
        )
    }
}
