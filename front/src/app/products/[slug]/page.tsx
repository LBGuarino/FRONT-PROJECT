import { ProductCard } from "@/components/ProductPageCard";
import getProduct from "@/helpers/getProduct";

export default async function Product({ 
    params,
} : {
    params: Promise<{ slug: string }>;
})  {
    const { slug } = await params;
    const {id, name, price, description, image, stock, categoryId} = await getProduct(Number(slug));

    return (
        <div>
            <ProductCard
                key={id}
                name={name}
                description={description}
                price={price}
                stock={stock}
                image={image}
                categoryId={categoryId}
            />

        </div>
    );
}

