import { DataSource } from "typeorm"

export const dataSource: DataSource = new DataSource({
    type: "postgres",
    host: "db", // ou localhost
    port: 5432,
    username: "root", //api_vendas
    password: "docker",
    database: "api_vendas",
    entities: ["src/modules/**/typeorm/entities/*.ts"],
    migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
})
