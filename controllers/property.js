const asyncHandler = require("express-async-handler");
const db = require("../models");
const redis = require("../config/redis.config");

exports.getProperties = asyncHandler(async (req, res) => {
  const { limit, page, fields, type, name, sort, ...query } = req.query;
  const options = {};

  // Sorting
  // sequelize : order = [[createAt, ASC], [name, DESC]]
  if (sort) {
    const order = sort
      .split(",")
      .map((el) =>
        el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
      );

    options.order = order;
  }

  // Limit field
  // squelize : {attributes: ['id','name']}
  if (fields) {
    const attributes = fields.split(",");
    const isExclude = attributes.some((el) => el.startsWith("-"));
    if (isExclude) {
      options.attributes = {
        exclude: attributes.map((el) => el.replace("-", "")), // squelize : attributes: {exclude: ['id']}
      };
    } else options.attributes = attributes;
  }

  if (!limit) {
    const alreadyGetAllRedis = await redis.get("get-property-redis");
    if (alreadyGetAllRedis) {
      return res.json({
        statusCode: 200,
        success: true,
        message: "Get property in redis success",
        data: JSON.parse(alreadyGetAllRedis),
      });
    }

    const rs = await db.Property.findAll({ where: query, options });
    redis.set("get-property-redis", JSON.stringify(rs));

    return res.json({
      statusCode: rs?.length > 0 ? 200 : 400,
      success: rs?.length > 0 ? true : false,
      message: rs?.length > 0 ? "Get property success" : "Get failure",
      data: rs && rs,
    });
  }

  // Pagination
  const prevPage = page - 1 > 0 ? page : 1;

  const offset = page && +page > 1 ? +page - 1 : 0; // start of page

  if (offset) options.offset = offset;
  options.limit = +limit;

  const response = await db.Property.findAndCountAll({
    where: query,
    ...options,
    include: [
      {
        model: db.User,
        as: "refUser",
        attributes: ["avatar", "phone", "name", "email"],
      },
      {
        model: db.User,
        as: "refOwner",
        attributes: ["avatar", "phone", "name", "email"],
      },
    ],
  });

  return res.json({
    statusCode: response?.length > 0 ? 200 : 400,
    success: response?.length > 0 ? true : false,
    message: response?.length > 0 ? "Get property success" : "Get failure",
    data: response && { ...response, limit: +limit, page: +page ? +page : 1 },
  });
});
