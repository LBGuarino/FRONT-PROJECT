import OrderForm from "@/components/OrderForm";
import ShoppingBagProductCard from "@/components/ShoppingBagProductCard";

export default function ShoppingBagPage() {
    return (
        <>
        <div className="flex bg-transparent">
          <div className='w-4/6 justify-center'>
            <OrderForm />
          </div>

          <div className='flex flex-wrap items-center p-16 align-center justify-center w-2/6 gap-3'>
            <ShoppingBagProductCard />
          </div>
        </div>
        </>
    );
}   

