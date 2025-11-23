import "./globals.css";

export const metadata = {
  title: "ValIdea",
  description: "Validate your ideas with the community",
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
