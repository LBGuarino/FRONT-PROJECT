"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Credential_1 = require("../entities/Credential");
const Order_1 = require("../entities/Order");
const Category_1 = require("../entities/Category");
const Product_1 = require("../entities/Product");
const OrderProduct_1 = require("../entities/OrderProduct");
// Dynamically configure data source based on environment
exports.AppDataSource = new typeorm_1.DataSource(process.env.DATABASE_URL
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL, // Use DATABASE_URL in production
        synchronize: false, // Disable synchronize in production
        logging: false,
        ssl: {
            rejectUnauthorized: false, // Required for many managed databases like Render
        },
        entities: [User_1.User, Credential_1.Credential, Order_1.Order, Product_1.Product, Category_1.Category, OrderProduct_1.OrderProduct],
        migrations: ["dist/migrations/**/*.js"], // Path to compiled migrations
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
        entities: [User_1.User, Credential_1.Credential, Order_1.Order, Product_1.Product, Category_1.Category, OrderProduct_1.OrderProduct],
        subscribers: [],
        migrations: ["src/migrations/**/*.ts"], // Path to TypeScript migrations
    });
