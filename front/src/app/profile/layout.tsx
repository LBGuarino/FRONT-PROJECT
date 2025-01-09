import "../globals.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
        <div className="flex flex-col lg:flex-row bg-transparent h-screen">
          <div className="hidden lg:block w-1/2 h-full">
            <img src='/images/authLayout.png' alt="logo" className='w-full h-full object-cover' loading="lazy" />
          </div>

          <div className="flex flex-col w-full lg:w-1/2 h-full">
            <div className="flex-1 overflow-auto p-8">
              {children}
            </div>
          </div>
        </div>
  );
}
