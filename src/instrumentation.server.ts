import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: 'https://1bd0693ca6c6456da26371b82843c883@o4511021796818944.ingest.de.sentry.io/4511021802717264',

  tracesSampleRate: 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: import.meta.env.DEV,
});