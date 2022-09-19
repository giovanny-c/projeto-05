import { DataSource } from "typeorm";

export const dataSource: DataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres", //api_vendas
    password: "docker",
    database: "apivendas",
    entities: ["src/modules/**/entities/*.ts"],
    migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
});

dataSource.initialize();
