import AnimatedPage from "@/components/AnimatedPage";
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
    console.log(product)
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div>Producto no encontrado.</div>;
  }

  return (
  <>
    <Breadcrumbs aria-label="breadcrumb" sx={{ margin: '1rem' }}>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href={`/products/&${product.category.name.toLowerCase()}`}>{product.category.name}</a>
      </Breadcrumbs>

    <AnimatedPage>
      <Divider />

      <AutoGrid
        id={product.id}
        name={product.name}
        description={product.description}
        price={product.price}
        stock={product.stock}
        image={product.image}
        category={product.category}
      />
    
    </AnimatedPage>
  </>
  );
}


