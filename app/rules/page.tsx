import Link from "next/link";
import { getItemsByCategory } from "@/lib/catalog";

export default function RulesPage() {
  const rules = getItemsByCategory("rules");

  return (
    <main className="shell rules-shell">
      <nav className="detail-nav" aria-label="Навигация">
        <Link href="/#search">← К поиску</Link>
      </nav>

      <header className="section-page-header">
        <p className="eyebrow">Полная инструкция</p>
        <h1>Правила Monopoly F1</h1>
        <p>Короткие разделы для быстрого поиска спорной ситуации во время партии.</p>
      </header>

      <nav className="rules-toc" aria-label="Содержание правил">
        {rules.map((rule, index) => (
          <a key={rule.id} href={`#${rule.id}`}>
            <span>{index + 1}</span>{rule.title_ru}
          </a>
        ))}
      </nav>

      <div className="rules-list">
        {rules.map((rule, index) => (
          <article id={rule.id} className="rule-section" key={rule.id}>
            <div className="rule-section__number">{index + 1}</div>
            <div>
              <h2>{rule.title_ru}</h2>
              <p className="rule-section__de" lang="de">{rule.title_de}</p>
              <p>{rule.text_ru}</p>
              <details>
                <summary>Показать немецкий оригинал</summary>
                <p lang="de">{rule.text_de}</p>
              </details>
              <div className="action-block">
                <strong>Коротко:</strong>
                <span>{rule.explanation_ru}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
