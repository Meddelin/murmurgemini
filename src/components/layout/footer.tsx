import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
             <h3 className="text-lg font-bold text-primary mb-4">MurmurGemini</h3>
             <p className="text-sm text-muted-foreground">
               Лучшие товары для ваших питомцев с доставкой на дом.
             </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Покупателям</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/delivery" className="hover:text-primary transition-colors">Доставка и оплата</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">О компании</Link></li>
              <li><Link href="/contacts" className="hover:text-primary transition-colors">Контакты</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/catalog/dogs" className="hover:text-primary transition-colors">Собакам</Link></li>
              <li><Link href="/catalog/cats" className="hover:text-primary transition-colors">Кошкам</Link></li>
              <li><Link href="/catalog/birds" className="hover:text-primary transition-colors">Птицам</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <p className="text-sm text-muted-foreground mb-2">8 800 123-45-67</p>
            <p className="text-sm text-muted-foreground">support@murmurgemini.ru</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © 2025 MurmurGemini. Все права защищены.
        </div>
      </div>
    </footer>
  )
}



