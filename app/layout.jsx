import './globals.css'

export const metadata = {
  title: 'Предсказания будущего - Международный женский день',
  description: 'Получите красивые предсказания о вашем будущем на Международный женский день',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Lobster&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background min-h-screen">
        {children}
      </body>
    </html>
  )
}