export const metadata = {
  title: '배너 에디터',
  description: '쉽게 사용할 수 있는 배너 제작 도구',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
