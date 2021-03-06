import dotenv from "dotenv";

/**
 * init dotenv
 * priority: environment -> .env
 *
 * Available settings
 *
 * APP_PORT=9527
 * APP_BASE_PATH=/v1
 * APP_JWT_PUBLIC_KEY=`a public key string`
 */

dotenv.config();

/**
 *
 * @param {string} name envrionment name
 * @param {object} opt option with { required, default }
 * @returns {*} value
 */

export function env(name, opt = {}) {
  const value = process.env[`APP_${name.toUpperCase()}`];

  if (opt.required && !value) {
    throw new Error(`environment ${name} is required`);
  }

  return value || opt.default;
}

/**
 * exports
 */
export const PORT = env("PORT", { default: 9527 });
export const BASE = env("BASE", { default: "/petstore/v0" });

/**
 * Mongodb
 */

export const MONGODB_CONNECTION = env("MONGODB_CONNECTION", {
  default: "mongodb://localhost/petstore",
});
