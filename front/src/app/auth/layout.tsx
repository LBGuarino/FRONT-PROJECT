import "../globals.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        Este es mi layout de autenticacion
        {children}
    </div>

  );
}
