import dotenv from "dotenv";
dotenv.config();

export interface IAppConfig {
  port: number | string;
  env: string;
}
export interface IDatabaseConfig {
  uri: string;
}
export interface IConfig {
  app: IAppConfig;
  database: IDatabaseConfig;
}
const config: IConfig = {
  app: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development",
  },
  database: {
    uri: process.env.DATABASE || "",
  },
};

export default config;
