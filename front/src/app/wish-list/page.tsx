import Image from "next/image";

export default async function ProductPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-14 font-light text-xl">
        <h1>Ideas are being developed...</h1>
        <p>This page will be available soon.</p>
      </div>
      <div className="flex justify-center mt-8">
        <Image src="/images/webdev.svg" alt="Site under development" width={700} height={700} />
      </div>
    </>
  );
}  