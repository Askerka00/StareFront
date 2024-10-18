import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { api } from "@/shared/api";
import { pluralize } from "@/shared/lib/pluralize.ts";

const escapeMarkdown = (text: string): string => {
  // Экранируем специальные символы в тексте сообщения
  return text.replace(/([_[\]()~`>#+=|{}.!-])/g, "\\$1");
};

export const server = {
  apply: defineAction({
    input: z.object({
      id: z.string(),
      name: z.string(),
      locationFrom: z.string(),
      locationTo: z.string(),
      startDateTime: z.string(),
      endDateTime: z.string(),
      firstName: z.string(),
      phoneNumber: z.string(),
    }),
    handler: async (
      {
        id,
        name,
        locationFrom,
        locationTo,
        startDateTime,
        endDateTime,
        firstName,
        phoneNumber,
      },
      { locals },
    ) => {
      // const sentry = getServerSentry(request);

      // console.log({
      //   env: locals.runtime.env,
      // });

      try {
        // const data = await request.formData();
        //
        // // @ts-ignore
        // if (locals.runtime.env.PROD) {
        //   // Turnstile injects a token in "cf-turnstile-response".
        //   const token = data.get("cf-turnstile-response") ?? "";
        //   const ip = request.headers.get("CF-Connecting-IP") ?? "";
        //
        //   // Validate the token by calling the "/siteverify" API.
        //   const formData = new FormData();
        //   // @ts-ignore
        //   formData.append("secret", locals.runtime.env.TURNSTILE_SECRET_KEY);
        //   formData.append("response", token);
        //   formData.append("remoteip", ip);
        //
        //   const result = await fetch(
        //     "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        //     {
        //       body: formData,
        //       method: "POST",
        //     },
        //   );
        //
        //   // @ts-ignore
        //   const outcome = await result.json<{ success: boolean }>();
        //
        //   if (!outcome.success) {
        //     throw new Error(
        //       "The provided Turnstile token was not valid! \n" +
        //         JSON.stringify(outcome),
        //     );
        //   }
        // }

        // @ts-ignore
        const TELEGRAM_BOT_TOKEN = locals.runtime.env.TELEGRAM_BOT_TOKEN;
        // @ts-ignore
        const TELEGRAM_CHAT_ID = locals.runtime.env.TELEGRAM_CHAT_ID;

        const doesntExists = [id, name, firstName, phoneNumber].some(
          (item) => item === "",
        );

        // Validate the data - you'll probably want to do more than this
        if (doesntExists) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "Missing required fields",
          });
        }

        const price = await api.checkout.getPrice({
          carId: id,
          locationFrom,
          locationTo,
          startDateTime,
          endDateTime,
          withInsurance: false,
        });

        // @ts-ignore
        const SITE_URL = locals.runtime.env.PUBLIC_SITE_URL;
        const daysPluralized = pluralize(price.days, ["день", "дня", "дней"]);

        const telegramMessage = `
✨ *Новая заявка с сайта ${SITE_URL}* ✨

*ID машины:* ${SITE_URL}cars/${id}
*Название:* ${name}

*Аренда за ${price.days} ${daysPluralized}*: ${price.rentPrice} ฿

*Доставка*: ${price.deliveryPrice} ฿
*Место подачи:* ${locationFrom} ${price.locationFromPrice} ฿
*Дата подачи:* ${startDateTime}
*Место возврата:* ${locationTo} ${price.locationToPrice} ฿
*Дата возврата:* ${endDateTime}

*Всего:* ${price.total} ฿
*+ депозит:* ${price.carDeposit} ฿

*Имя:* ${firstName}
*Номер телефона:* ${phoneNumber}
`;

        const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: escapeMarkdown(telegramMessage),
            parse_mode: "MarkdownV2", // Указываем использование Markdown
          }),
        };

        console.log({ telegramMessage, apiUrl, requestOptions });

        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
          // @ts-ignore
          const { description } = await response.json<{
            ok: boolean;
            description: string;
          }>();

          throw new ActionError({
            code: "BAD_REQUEST",
            message: `Telegram API request failed with status ${response.status}: ${description}`,
          });
        }

        return;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-nocheck
        // sentry.captureException(error);

        throw new ActionError({
          code: "BAD_REQUEST",
          // @ts-expect-error won't parse error
          message: error.message,
        });
      }
    },
  }),
  applyPromotion: defineAction({
    input: z.object({
      id: z.string(),
      promotionId: z.string(),
      name: z.string(),
      locationFrom: z.string(),
      locationTo: z.string(),
      startDateTime: z.string(),
      endDateTime: z.string(),
      firstName: z.string(),
      phoneNumber: z.string(),
    }),
    handler: async (
      {
        id,
        promotionId,
        name,
        locationFrom,
        locationTo,
        startDateTime,
        endDateTime,
        firstName,
        phoneNumber,
      },
      { locals },
    ) => {
      // const sentry = getServerSentry(request);

      // console.log({
      //   env: locals.runtime.env,
      // });

      try {
        // const data = await request.formData();
        //
        // // @ts-ignore
        // if (locals.runtime.env.PROD) {
        //   // Turnstile injects a token in "cf-turnstile-response".
        //   const token = data.get("cf-turnstile-response") ?? "";
        //   const ip = request.headers.get("CF-Connecting-IP") ?? "";
        //
        //   // Validate the token by calling the "/siteverify" API.
        //   const formData = new FormData();
        //   // @ts-ignore
        //   formData.append("secret", locals.runtime.env.TURNSTILE_SECRET_KEY);
        //   formData.append("response", token);
        //   formData.append("remoteip", ip);
        //
        //   const result = await fetch(
        //     "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        //     {
        //       body: formData,
        //       method: "POST",
        //     },
        //   );
        //
        //   // @ts-ignore
        //   const outcome = await result.json<{ success: boolean }>();
        //
        //   if (!outcome.success) {
        //     throw new Error(
        //       "The provided Turnstile token was not valid! \n" +
        //         JSON.stringify(outcome),
        //     );
        //   }
        // }

        // @ts-ignore
        const TELEGRAM_BOT_TOKEN = locals.runtime.env.TELEGRAM_BOT_TOKEN;
        // @ts-ignore
        const TELEGRAM_CHAT_ID = locals.runtime.env.TELEGRAM_CHAT_ID;

        const doesntExists = [id, name, firstName, phoneNumber].some(
          (item) => item === "",
        );

        // Validate the data - you'll probably want to do more than this
        if (doesntExists) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "Missing required fields",
          });
        }

        const price = await api.checkout.getPromotion({
          promotionId,
          locationFrom,
          locationTo,
          startDateTime,
          endDateTime,
          withInsurance: false,
        });

        // @ts-ignore
        const SITE_URL = locals.runtime.env.PUBLIC_SITE_URL;
        const daysPluralized = pluralize(price.days, ["день", "дня", "дней"]);

        const telegramMessage = `
✨ *Новая заявка с сайта ${SITE_URL}* ✨

*АКЦИЯ*

*ID акции:* ${SITE_URL}cars/${id}/promotions/${promotionId}

*ID машины:* ${SITE_URL}cars/${id}
*Название:* ${name}

*Аренда за ${price.days} ${daysPluralized}*: ${price.rentPrice} ฿

*Доставка*: ${price.deliveryPrice} ฿
*Место подачи:* ${locationFrom} ${price.locationFromPrice} ฿
*Дата подачи:* ${startDateTime}
*Место возврата:* ${locationTo} ${price.locationToPrice} ฿
*Дата возврата:* ${endDateTime}

*Всего:* ${price.total} ฿
*+ депозит:* ${price.carDeposit} ฿

*Имя:* ${firstName}
*Номер телефона:* ${phoneNumber}
`;

        const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: escapeMarkdown(telegramMessage),
            parse_mode: "MarkdownV2", // Указываем использование Markdown
          }),
        };

        console.log({ telegramMessage, apiUrl, requestOptions });

        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
          // @ts-ignore
          const { description } = await response.json<{
            ok: boolean;
            description: string;
          }>();

          throw new ActionError({
            code: "BAD_REQUEST",
            message: `Telegram API request failed with status ${response.status}: ${description}`,
          });
        }

        return;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-nocheck
        // sentry.captureException(error);

        throw new ActionError({
          code: "BAD_REQUEST",
          // @ts-expect-error won't parse error
          message: error.message,
        });
      }
    },
  }),
};
