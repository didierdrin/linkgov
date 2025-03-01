// src/app/(auth)/layout.tsx
export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <h1 className="text-4xl font-bold text-white mb-6">Welcome to LinkGov</h1>
        {children}
      </div>
    );
  }