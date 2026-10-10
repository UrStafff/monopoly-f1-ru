import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";
import { categoryMeta } from "@/lib/catalog";
import type { CatalogItem } from "@/types/catalog";

export default function ItemCard({
  item,
  compact = false,
  expanded = false,
}: {
  item: CatalogItem;
  compact?: boolean;
  expanded?: boolean;
}) {
  const meta = categoryMeta[item.category];

  return (
    <article className={`result-card ${compact ? "result-card--compact" : ""}`}>
      <div className="result-card__topline">
        <span className="category-pill"><CategoryIcon category={item.category} /> {meta.shortLabel}</span>
        {item.copies && item.copies > 1 ? (
          <span className="copies">×{item.copies} в комплекте</span>
        ) : null}
      </div>

      <h2 className="result-title">
        <Link className="result-title__link" href={`/item/${item.id}`}>{item.title_de}</Link>
      </h2>
      {item.title_ru !== item.title_de ? (
        <p className="result-subtitle">{item.title_ru}</p>
      ) : null}

      <section className="action-block">
        <strong>Что делать:</strong>
        <span>{item.explanation_ru}</span>
      </section>

      {!compact ? (
        <details className="card-details" open={expanded || undefined}>
          <summary>{expanded ? "Полная информация" : "Показать полный текст"}</summary>
          <div className="card-details__content">
            <section className="translation-block">
              <div className="translation-heading">
                <span aria-hidden="true">🇩🇪</span>
                <span>Немецкий оригинал</span>
              </div>
              <p lang="de">{item.text_de}</p>
            </section>

            <section className="translation-block translation-block--ru">
              <div className="translation-heading">
                <span aria-hidden="true">🇷🇺</span>
                <span>Русский перевод</span>
              </div>
              <p>{item.text_ru}</p>
            </section>
          </div>
        </details>
      ) : null}

      <Link className="open-card-link" href={`/item/${item.id}`}>Открыть карточку →</Link>
    </article>
  );
}
