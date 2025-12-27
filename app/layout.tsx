'use client';

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <title>Syazai.com - あらゆるミスの「正解」がここにある</title>
        <meta name="description" content="謝罪の総合ポータルサイト。ビジネス、プライベート、あらゆるシーンでの謝罪文テンプレートとツールを提供。" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
