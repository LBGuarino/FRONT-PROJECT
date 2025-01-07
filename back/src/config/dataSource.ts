import { DataSource } from "typeorm";
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
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Pollo1525",
  database: "proyecto_m4_front",
        synchronize: true, // Enable synchronize for development
        logging: false, // Enable logging for debugging
  entities: [User, Credential, Order, Product, Category, OrderProduct],
  subscribers: [],
  migrations: [],
      }
);

