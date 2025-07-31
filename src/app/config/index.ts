import dotenv from "dotenv";
dotenv.config();

export interface IAppConfig {
  port: number | string;
  env: string;
}
export interface IDatabaseConfig {
  uri: string;
}
export interface IJwtConfig {
  secret: string;
  expires_in: string;
  refresh_secret: string;
  refresh_expires_in: string;
}

export interface IBcryptConfig {
  salt_rounds: number;
}
export interface IConfig {
  app: IAppConfig;
  database: IDatabaseConfig;
  jwt: IJwtConfig
}
const config: IConfig = {
  app: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
    expires_in: process.env.JWT_EXPIRES_IN || "5h",
    refresh_secret: process.env.JWT_REFRESH_SECRET || "",
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  },
  database: {
    uri: process.env.DATABASE || "",
  },
};

export default config;
