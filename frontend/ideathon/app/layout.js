// app/layout.tsx or app/layout.js
import "./globals.css";

export const metadata = {
  title: "ValIdea",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
