import OrderGrid from "@/components/OrdersCard";

export default function MyOrdersPage() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      <OrderGrid />
    </div>
  );
}