import Image from "next/image";
import Link from "next/link";

export default async function EmailVerification() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-14 font-light text-xl gap-2">
        <h1>E-mail verification needed...</h1>
        <p>We have sent you an email to verify your account. 
            Please check your email and click on the attached link to continue.
        </p>

        <Link href={"/login"} className="text-blue-500 p-4 hover:underline">
          You did not receive an email?
        </Link>
      </div>
      <div className="flex justify-center mt-8">
        <Image src="/images/email-verif.svg" alt="Please check your email" width={700} height={500} />
      </div>
    </>
  );
}  