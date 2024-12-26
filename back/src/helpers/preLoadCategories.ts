import { AppDataSource } from "../config/dataSource";
import { Category } from "../entities/Category";
import { CategoryRepository } from "../repositories/category.respository";

interface ICategory {
    name: string;
}

const categoriesToPreLoad: ICategory[] = [
    { name: 'Candles' },
    { name: 'Scented Candles' },
    { name: 'Scented Oils' },
    { name: 'Diffusers' },
    { name: 'Parfumes' },
    { name: 'Candle Holders' },
    { name: 'Fragrances' },
    { name: 'Soaps' },
    { name: 'Accessories' }
];

export const preLoadCategories = async () => {
    const categories = await CategoryRepository.find();
    if (!categories.length) await AppDataSource.createQueryBuilder().insert().into(Category).values(categoriesToPreLoad).execute();
    console.log('Categories preloaded');
}