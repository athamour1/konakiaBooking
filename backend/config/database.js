module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'koankia-booking'),
      user: env('DATABASE_USERNAME', 'koankia-booking'),
      password: env('DATABASE_PASSWORD', 'koankia-booking')
    },
    debug: false,
  },
});