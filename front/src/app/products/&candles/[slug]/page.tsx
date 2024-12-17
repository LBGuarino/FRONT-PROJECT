import AutoGrid from "@/components/Product";
import { IProduct } from "@/interfaces/IProduct";
import { Breadcrumbs, Divider } from "@mui/material";

interface ProductPageProps {
  params: { slug: string };  
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  let product: IProduct;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    product = await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div>Producto no encontrado.</div>;
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ margin: '1rem' }}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
          <a href={`/products/&${product.category.name.toLowerCase()}`}>{product.category.name}</a>
        </li>
      </Breadcrumbs>

      <Divider />

      <AutoGrid
        name={product.name}
        description={product.description}
        price={product.price}
        stock={product.stock}
        image={product.image}
        category={product.category}
      />
    
    </>
  );
}


