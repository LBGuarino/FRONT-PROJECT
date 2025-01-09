import OrderForm from "@/components/OrderForm";
import ShoppingBagProductCard from "@/components/ShoppingBagProductCard";

export default function ShoppingBagPage() {
  return (
    <div className="flex flex-col lg:flex-row items-center font-sans justify-center bg-transparent min-h-screen gap-4">
      <div className="w-full lg:w-full flex flex-col items-center justify-center p-4 lg:p-8">
        <OrderForm />
      </div>

      <div className="w-full flex flex-col items-center justify-center p-4 lg:p-8">
        <ShoppingBagProductCard />
      </div>
    </div>
  );
}


