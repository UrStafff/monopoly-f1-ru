import Link from "next/link";
import { notFound } from "next/navigation";
import ItemCard from "@/components/ItemCard";
import { allItems, getItemById } from "@/lib/catalog";

export function generateStaticParams() {
  return allItems.map((item) => ({ id: item.id }));
}

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getItemById(id);

  if (!item) notFound();

  return (
    <main className="shell detail-shell">
      <nav className="detail-nav" aria-label="Навигация">
        <Link href="/#search">← К поиску</Link>
        {item.category === "rules" ? <Link href="/rules">Все правила</Link> : null}
      </nav>

      <ItemCard item={item} expanded />

      <div className="detail-footer">
        <Link href="/#search">← Найти другую карточку</Link>
      </div>
    </main>
  );
}
