import { defineMiddleware } from "astro:middleware";

import { getLangFromUrl } from "@/shared/i18n";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  context.locals.locale = getLangFromUrl(context.url);

  // return a Response or the result of calling `next()`
  return next();
});
