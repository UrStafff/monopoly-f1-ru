import rawCatalog from "@/data/catalog.json";
import type { CatalogData, CatalogItem, Category } from "@/types/catalog";

const catalog = rawCatalog as unknown as CatalogData;

export const allItems: CatalogItem[] = [
  ...catalog.rules,
  ...catalog.teams,
  ...catalog.auto_cards,
  ...catalog.driver_cards,
  ...catalog.pit_stop_cards,
  ...catalog.races,
];

export const categoryMeta: Record<
  Category,
  { label: string; shortLabel: string }
> = {
  rules: { label: "Правила", shortLabel: "Правила" },
  race: { label: "Трассы", shortLabel: "Трассы" },
  driver: { label: "Пилот", shortLabel: "Fahrer" },
  auto: { label: "Автомобиль", shortLabel: "Auto" },
  pit_stop: { label: "Пит-стоп", shortLabel: "Boxenstopp" },
  team: { label: "Команды", shortLabel: "Команды" },
};

export function categoryCount(category: Category): number {
  return allItems.filter((item) => item.category === category).length;
}

export function getItemById(id: string): CatalogItem | undefined {
  return allItems.find((item) => item.id === id);
}

export function getItemsByCategory(category: Category): CatalogItem[] {
  return allItems.filter((item) => item.category === category);
}
