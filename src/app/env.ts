import Config from 'react-native-config';

export const env = {
  CURRENT_ENVIRONMENT: getEnv('CURRENT_ENVIRONMENT') as
    | 'production'
    | 'development',
  BASE_API_URL: getEnv('BASE_API_URL'),
};

function getEnv(name: string, isRequired = true) {
  const value = Config[name];

  if (isRequired && value === undefined) {
    console.error(
      `Required environment variable ${name} not defined. Set it on .env to run the app.`,
    );
  }

  return value;
}
