import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";

import type { Locale } from "./routes";

/**
 * Las claves salen del diccionario inglés: pedir una que no exista rompe el
 * build. `es` se tipa contra esas mismas claves, así que una traducción que
 * falte también lo rompe.
 */
export type MessageKey = keyof typeof enMessages;

const dictionaries: Record<Locale, Record<MessageKey, string>> = {
  en: enMessages,
  es: esMessages,
};

export function t(locale: Locale, key: MessageKey): string {
  return dictionaries[locale][key];
}
