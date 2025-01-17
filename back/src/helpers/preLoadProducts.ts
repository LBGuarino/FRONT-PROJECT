import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "Black Cherry",
    price: 17,
    description:
      "Original Large Jar Scented Candle",
    image:
      "https://thecandleshop.com.ar/cdn/shop/files/Luz_Esperanza_-_Foto_fondo_blanco_C.jpg?v=1732562510&width=493",
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

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
