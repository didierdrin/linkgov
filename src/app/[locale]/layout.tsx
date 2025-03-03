import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="p-4 bg-gray-200">
        <h1 className="text-2xl font-bold">My Application</h1>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}


// import React from 'react';

// interface LocaleLayoutProps {
//   children: React.ReactNode;
//   // Allow params to be either a plain object or a Promise resolving to one
//   params: { locale: string } | Promise<{ locale: string }>;
// }

// export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
//   // Ensure that params is awaited, whether it's a promise or a plain object
//   const { locale } = await Promise.resolve(params);

//   return (
//     <div className="min-h-screen">
//       <header className="p-4 bg-gray-200">
//         <h1 className="text-2xl font-bold">Locale: {locale}</h1>
//       </header>
//       <main className="p-4">{children}</main>
//     </div>
//   );
// }
