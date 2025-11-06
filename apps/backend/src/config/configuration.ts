export default () => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
  cobaltApiUrl: process.env.COBALT_API_URL ?? 'https://api.cobalt.tools',
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? undefined
});
