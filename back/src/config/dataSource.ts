import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./envs";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Order } from "../entities/Order";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { OrderProduct } from "../entities/OrderProduct";

// Dynamically configure data source based on environment
export const AppDataSource = new DataSource(
  process.env.DATABASE_URL
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL, // Use DATABASE_URL in production
        synchronize: false, // Disable synchronize in production
        logging: false,
        ssl: {
          rejectUnauthorized: false, // Required for many managed databases like Render
        },
        entities: [User, Credential, Order, Product, Category, OrderProduct],
      }
    : {
        type: "postgres", // Local development configuration
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        synchronize: true, // Enable synchronize for development
        logging: true, // Enable logging for debugging
        entities: [User, Credential, Order, Product, Category, OrderProduct],
        subscribers: [],
        migrations: [],
      }
);

