import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import { Express } from "express";

export default (sentry: typeof Sentry, app: Express, sentryUrl: string) => {
  return sentry.init({
    dsn: sentryUrl,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
};
