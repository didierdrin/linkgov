import React from 'react';

interface LocalePageProps {
  params: { locale: string };
}

export default function LocalePage({ params }: LocalePageProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">
        Welcome to the {params.locale.toUpperCase()} version of our site!
      </h2>
      <p className="mt-2 text-gray-700">
        This page is localized for {params.locale}.
      </p>
    </div>
  );
}
