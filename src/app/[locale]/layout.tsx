import React from 'react';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="p-4 bg-gray-200">
        <h1 className="text-2xl font-bold">Locale: {params.locale}</h1>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
