import type { Category } from "@/types/catalog";

export default function CategoryIcon({ category }: { category: Category }) {
  if (category === "driver") {
    return (
      <svg
        className="category-icon category-icon--helmet"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
      >
        <path
          d="M4.2 13.2v-2.1c0-4.4 3.2-7.6 7.8-7.6 4.8 0 7.8 3.1 7.8 7.4v1.2h-8.1c-1.8 0-3.2 1.4-3.2 3.2v1.2H6.8c-1.4 0-2.6-1.2-2.6-2.6v-.7Z"
          fill="currentColor"
        />
        <path
          d="M10.2 15.5c0-1 .8-1.8 1.8-1.8h7.7c-.5 3.9-3.5 6.8-7.5 6.8H10l.2-5Z"
          fill="currentColor"
          opacity=".86"
        />
        <path d="M14.1 6.1c2.1.5 3.5 2 3.9 4.1h-5.3l1.4-4.1Z" fill="var(--surface)" opacity=".96" />
      </svg>
    );
  }

  const icons: Record<Exclude<Category, "driver">, string> = {
    rules: "📖",
    race: "🏁",
    auto: "🏎️",
    pit_stop: "🔧",
    team: "👥",
  };

  return <span className="category-icon" aria-hidden="true">{icons[category]}</span>;
}
