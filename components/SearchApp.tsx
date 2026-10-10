"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { useMemo, useState } from "react";
import ItemCard from "@/components/ItemCard";
import CategoryIcon from "@/components/CategoryIcon";
import { allItems, categoryCount, categoryMeta } from "@/lib/catalog";
import type { CatalogItem, Category } from "@/types/catalog";

const categories: Category[] = ["rules", "race", "driver", "auto", "pit_stop", "team"];

function normalize(value: string) {
  return value
    .toLowerCase()
    .replaceAll("ё", "е")
    .replace(/[™®’'„“”]/g, " ")
    .replace(/[^0-9a-zа-яäöüßéáíóúñç]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function nounForCount(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "результат";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "результата";
  return "результатов";
}

export default function SearchApp() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");

  const fuse = useMemo(
    () =>
      new Fuse(allItems, {
        keys: [
          { name: "title_de", weight: 0.34 },
          { name: "title_ru", weight: 0.34 },
          { name: "keywords", weight: 0.16 },
          { name: "text_de", weight: 0.07 },
          { name: "text_ru", weight: 0.07 },
          { name: "search_text", weight: 0.02 },
        ],
        threshold: 0.36,
        distance: 140,
        ignoreLocation: true,
        minMatchCharLength: 2,
        includeScore: true,
      }),
    []
  );

  const results = useMemo(() => {
    const normalized = normalize(query);
    let items: CatalogItem[];

    if (!normalized) {
      items = allItems;
    } else {
      const direct = allItems.filter((item) =>
        normalize(
          [
            item.title_de,
            item.title_ru,
            item.text_de,
            item.text_ru,
            ...(item.keywords ?? []),
          ].join(" ")
        ).includes(normalized)
      );

      const fuzzy = fuse.search(normalized).map((result) => result.item);
      items = Array.from(new Map([...direct, ...fuzzy].map((item) => [item.id, item])).values());
    }

    if (category !== "all") {
      items = items.filter((item) => item.category === category);
    }

    return items.slice(0, 24);
  }, [query, category, fuse]);

  const hasQuery = query.trim().length > 0;

  return (
    <main className="shell">
      <section className="hero">
        <div className="brand-mark" aria-hidden="true">F1</div>
        <div>
          <p className="eyebrow">Справочник для игры</p>
          <h1>Monopoly F1 — русский справочник</h1>
          <p className="hero-copy">
            Введите слово с немецкой карточки или найдите нужный раздел.
          </p>
        </div>
      </section>

      <nav className="quick-nav" aria-label="Быстрая навигация">
        <a href="#search">Поиск</a>
        <Link href="/rules">Все правила</Link>
      </nav>

      <section id="search" className="search-panel" aria-label="Поиск по справочнику">
        <label className="search-box">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Найти карточку..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            inputMode="search"
            aria-label="Найти карточку"
          />
          {query ? (
            <button className="clear-button" onClick={() => setQuery("")} aria-label="Очистить поиск">
              ×
            </button>
          ) : null}
        </label>

        <div className="category-scroller" role="group" aria-label="Категории">
          <button
            className={`category-button ${category === "all" ? "is-active" : ""}`}
            onClick={() => setCategory("all")}
          >
            Все <span>{allItems.length}</span>
          </button>
          {categories.map((key) => (
            <button
              key={key}
              className={`category-button ${category === key ? "is-active" : ""}`}
              onClick={() => setCategory(key)}
            >
              <CategoryIcon category={key} /> {categoryMeta[key].shortLabel}
              <span>{categoryCount(key)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="results-section">
        <div className="results-header">
          <div>
            <p className="results-kicker">{hasQuery ? "Результаты поиска" : "Быстрый доступ"}</p>
            <h2>
              {results.length
                ? hasQuery
                  ? `${results.length} ${nounForCount(results.length)}`
                  : `${results.length} карточек`
                : "Ничего не найдено"}
            </h2>
          </div>
          {category !== "all" ? (
            <button className="reset-filter" onClick={() => setCategory("all")}>Сбросить фильтр</button>
          ) : null}
        </div>

        {results.length ? (
          <div className="results-grid">
            {results.map((item) => <ItemCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">🏎️</div>
            <h3>Карточка не нашлась</h3>
            <p>Попробуйте ввести 2–3 слова с карточки, часть названия или выберите другую категорию.</p>
            <button onClick={() => { setQuery(""); setCategory("all"); }}>Показать все</button>
          </div>
        )}
      </section>
    </main>
  );
}
