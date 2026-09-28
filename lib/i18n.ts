import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";

import type { Locale } from "./routes";

export type MessageKey = keyof typeof enMessages;

const dictionaries: Record<Locale, Record<MessageKey, string>> = {
  en: enMessages,
  es: esMessages,
};

export function t(locale: Locale, key: MessageKey): string {
  return dictionaries[locale][key];
}
