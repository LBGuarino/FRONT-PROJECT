import "../globals.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
        <div className="flex flex-row bg-transparent h-screen">
          <div className='w-1/2 h-full'>
            <img src='/images/authLayout.png' alt="logo" className='w-full h-full object-cover' />
          </div>

          <div className='flex flex-col items-center p-16 align-center justify-center w-1/2 h-full gap-3'>
            {children}
          </div>
        </div>
  );
}
