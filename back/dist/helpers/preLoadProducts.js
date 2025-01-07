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
exports.preLoadProducts = void 0;
const dataSource_1 = require("../config/dataSource");
const Product_1 = require("../entities/Product");
const product_repository_1 = require("../repositories/product.repository");
const productsToPreLoad = [
    {
        name: "Black Cherry",
        price: 17,
        description: "Original Large Jar Scented Candle",
        image: "https://thecandleshop.com.ar/cdn/shop/files/Luz_Esperanza_-_Foto_fondo_blanco_C.jpg?v=1732562510&width=493",
        categoryId: 1,
        stock: 10,
    },
    {
        name: "Midnight Jasmine",
        description: "Original Large Jar Scented Candle",
        price: 30,
        stock: 4,
        image: "https://thecandleshop.com.ar/cdn/shop/files/A24V_VELAAROMATICAQUEENIIVAINILLA_a.jpg?v=1690202796&width=493",
        categoryId: 3
    },
    {
        name: "Mulberry",
        description: "Signature Large Jar Scented candle",
        price: 30,
        stock: 20,
        image: "https://thecandleshop.com.ar/cdn/shop/files/VelaGreyM_a_9b1ad9b4-fb10-46a4-9d7d-92317af4db4a.jpg?v=1699316292&width=1100",
        categoryId: 2
    },
    {
        name: "Christmas Eve",
        description: "Signature Large Jar Scented candle",
        price: 25,
        stock: 30,
        image: "https://thecandleshop.com.ar/cdn/shop/products/A09Z_20__20VELA_20AROMATICA_20VOTIVA_20MANZANA_20CANELA.jpg?v=1686140849&width=1100",
        categoryId: 5
    },
    {
        name: "Smoked Vanilla",
        description: "Original Small Scented candle",
        price: 17,
        stock: 10,
        image: "https://thecandleshop.com.ar/cdn/shop/products/A05CV_20__20VELA_20AROMATICA_2010X10_20CEDRO_20VERBENA.jpg?v=1686140434&width=1100",
        categoryId: 5
    },
    {
        name: "Christmas in Munich",
        description: "Original Medium Scented candle",
        price: 23,
        stock: 9,
        image: "https://thecandleshop.com.ar/cdn/shop/products/A03Z_20__20VELA_20AROMATICA_206X10_20MANZANA_20CANELA.jpg?v=1686140506&width=493",
        categoryId: 2
    },
    {
        name: "London Christmas Tea",
        description: "Original Small Scented candle",
        price: 18,
        stock: 7,
        image: "https://thecandleshop.com.ar/cdn/shop/products/A03MV_20__20VELA_20AROMATICA_206X10_20MAGNOLIA_20VAINILLA.jpg?v=1686140499&width=493",
        categoryId: 1
    },
    {
        name: "A Calm & Quiet Place",
        description: "Signature Small Scented candle",
        price: 20,
        stock: 20,
        image: "https://thecandleshop.com.ar/cdn/shop/products/A03G_20__20VELA_20AROMATICA_206X10_20GARDENIA.jpg?v=1686140484&width=493",
        categoryId: 3
    }
];
const preLoadProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_repository_1.ProductRepository.find();
    if (!products.length)
        yield dataSource_1.AppDataSource.createQueryBuilder()
            .insert()
            .into(Product_1.Product)
            .values(productsToPreLoad)
            .execute();
    console.log("Products preloaded");
});
exports.preLoadProducts = preLoadProducts;
