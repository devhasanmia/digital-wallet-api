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

export interface ISeedAdmin {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin';
}


export interface IConfig {
  app: IAppConfig;
  database: IDatabaseConfig;
  jwt: IJwtConfig;
  seed_admin: ISeedAdmin;
}
const config: IConfig = {
  app: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "production",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
    expires_in: process.env.JWT_EXPIRES_IN || "1d",
    refresh_secret: process.env.JWT_REFRESH_SECRET || "",
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  },
  database: {
    uri: process.env.DATABASE || "",
  },
  seed_admin: {
    name: process.env.ADMIN_NAME || "Super Admin",
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    phone: process.env.ADMIN_PHONE || "01700000000",
    password: process.env.ADMIN_PASSWORD || "admin1234",
    role: "admin",
  }
};

export default config;
