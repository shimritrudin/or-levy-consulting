import "./globals.css";

export const metadata = {
  title: "Or Levy — HR Consultant & Career Advisor",
  description:
    "Independent HR practice for founders and operators. Career advising, organizational design, and founder coaching — from Tel Aviv, working worldwide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Public+Sans:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Space+Grotesk:wght@400;500;600&family=Fraunces:ital,wght@0,400;0,500&family=IBM+Plex+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
