import "reflect-metadata"
import { DataSource } from "typeorm"

export const dataSourceORM: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root", //api_vendas
    password: "docker",
    database: "api_vendas",
    // migrationsRun: true,
    // logging: true,
    entities: ["src/modules/**/entities/*.ts"],
    migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
})

//yarn typeorm migration:create ./src/shared/infra/http/typeorm/migrations/migratioName
dataSourceORM.initialize()
