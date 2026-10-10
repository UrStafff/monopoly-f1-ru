export type Category = "rules" | "team" | "auto" | "driver" | "pit_stop" | "race";

export interface CatalogItem {
  id: string;
  category: Category;
  title_de: string;
  title_ru: string;
  text_de: string;
  text_ru: string;
  explanation_ru: string;
  keywords: string[];
  search_text: string;
  source: string | string[];
  subtype?: "event" | "part" | "keep";
  copies?: number;
  color_group?: string;
}

export interface CatalogData {
  rules: CatalogItem[];
  teams: CatalogItem[];
  auto_cards: CatalogItem[];
  driver_cards: CatalogItem[];
  pit_stop_cards: CatalogItem[];
  races: CatalogItem[];
}
