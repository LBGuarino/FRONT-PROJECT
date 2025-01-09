import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Order } from "../entities/Order";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { OrderProduct } from "../entities/OrderProduct";

export const AppDataSource = new DataSource(
  process.env.DATABASE_URL
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL, 
        synchronize: false, 
        logging: false,
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [User, Credential, Order, Product, Category, OrderProduct],
        migrations: ["dist/migrations/**/*.js"],
      }
    : {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "Pollo1525",
        database: "proyecto_m4_front",
        synchronize: true, 
        logging: false, 
        entities: [User, Credential, Order, Product, Category, OrderProduct],
        subscribers: [],
        migrations: ["src/migrations/**/*.ts"],
      }
);
