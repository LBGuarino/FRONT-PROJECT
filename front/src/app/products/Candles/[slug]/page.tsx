/* eslint-disable */
import AnimatedPage from "@/components/AnimatedPage";
import AutoGrid from "@/components/Product";
import { IProduct } from "@/interfaces/IProduct";
import { Breadcrumbs, Divider } from "@mui/material";
import Link from "next/link";

// interface PageParams {
//   params: {
//     slug: string;
//   };
// }

export default async function ProductPage({ params }: any): Promise<JSX.Element> {
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
      <Breadcrumbs aria-label="breadcrumb" sx={{ margin: "1rem" }}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href={`/products/${product.category.name.toLowerCase()}`}>
          {product.category.name}
        </Link>
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
