import { camelizeKeys } from "humps";

/**
 * Build filter for list function
 *
 * @constructor
 * @param {Object} raw raw filter
 * @param {Schema} schema mongoose schema
 * @returns {Object} normalized filter
 */
export default function build(raw, schema) {
  const filter = Object.keys(raw).reduce((acc, key) => {
    let val = raw[key];
    if (!val) return acc;

    // array
    if (Array.isArray(val)) {
      acc[key] = { $in: val };
      return acc;
    }

    // `_gt`, `_lt`, `_gte` `_lte` or `_ne`
    let match = /(.+)_(gt|lt|gte|lte|ne)$/.exec(key);
    if (match) {
      const path = match[1];
      const op = match[2];
      acc[path] = acc[path] || {};
      acc[path][`$${op}`] = val;
      return acc;
    }

    // other not string
    if (typeof val !== "string") {
      acc[key] = val;
      return acc;
    }

    // remove end space
    val = val.trim();

    // `_like`
    match = /(.+)_like/.exec(key);
    if (match) {
      const path = match[1];
      acc[path] = { $regex: new RegExp(val, "i") };
      return acc;
    }

    if (key === "q") acc["$text"] = { $search: val };
    // TODO: should use schema.Path(key) to get type
    else if (val === "true") acc[key] = true;
    else if (val === "false") acc[key] = false;
    else if (val === "*") acc[key] = { $ne: [] };
    else if (val === "none") acc[key] = { $eq: [] };

    return acc;
  }, {});

  return camelizeKeys(filter);
}
