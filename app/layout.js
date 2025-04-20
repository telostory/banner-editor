import './globals.css';

export const metadata = {
  title: '배너 에디터',
  description: '쉽고 간편하게 배너를 만들 수 있는 웹 에디터입니다.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
