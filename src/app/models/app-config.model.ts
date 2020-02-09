export interface AppConfig {
  env: {
    name: string;
  };
  apiServer: {
    url: string;
  };
  logging: {
    level: string;
    console: boolean;
  };
}
