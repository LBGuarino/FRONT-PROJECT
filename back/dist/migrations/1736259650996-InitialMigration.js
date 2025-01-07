"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1736259650996 = void 0;
class InitialMigration1736259650996 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );

      CREATE TABLE credentials (
        id SERIAL PRIMARY KEY,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        auth0Sub VARCHAR(255) UNIQUE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address VARCHAR(255),
        phone VARCHAR(20),
        isRegistered BOOLEAN NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT 'user',
        credentialId INTEGER UNIQUE REFERENCES credentials(id) ON DELETE CASCADE
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        stock INTEGER NOT NULL,
        image TEXT NOT NULL,
        categoryId INTEGER REFERENCES categories(id) ON DELETE CASCADE
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        status VARCHAR(255) NOT NULL DEFAULT 'pending',
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        userId INTEGER REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE order_products (
        id SERIAL PRIMARY KEY,
        orderId INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        productId INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL
      );
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      DROP TABLE order_products;
      DROP TABLE orders;
      DROP TABLE products;
      DROP TABLE users;
      DROP TABLE credentials;
      DROP TABLE categories;
    `);
        });
    }
}
exports.InitialMigration1736259650996 = InitialMigration1736259650996;
