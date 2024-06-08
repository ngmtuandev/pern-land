const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Sequelize } = require("sequelize");
const redis = require("../config/redis.config");
const { generateIpKeyRedis } = require("../helper/XFunction");

exports.createNewPropertyType = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const rs = await db.PropertyType.findOrCreate({
    where: { name },
    defaults: { ...req.body },
  });

  return res.json({
    statusCode: rs[1],
    success: rs[1] ? true : false,
    message: rs[1] ? "Created property success" : "Created property failure",
    userCurrent: rs[0],
  });
});

exports.getPropertyTypes = asyncHandler(async (req, res) => {
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

  // Filter
  if (name) {
    // select name with auto lower
    query.name = db.Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("name")),
      "LIKE",
      `%${name.toLocaleLowerCase()}%`
    );
  }

  if (!limit) {
    const keyPropertyRedis = generateIpKeyRedis(fields);
    const alreadyGetAllRedis = await redis.get(keyPropertyRedis);
    if (alreadyGetAllRedis) {
      return res.json({
        statusCode: 200,
        success: true,
        message: "Get propertype in redis success",
        data: JSON.parse(alreadyGetAllRedis),
      });
    }

    const rs = await db.PropertyType.findAll({ where: query, options });

    redis.set(keyPropertyRedis, JSON.stringify(rs));
    redis.expireAt(keyPropertyRedis, parseInt(+new Date() / 1000) + 2000);

    return res.json({
      statusCode: rs?.length > 0 ? 200 : 400,
      success: rs?.length > 0 ? true : false,
      message: rs?.length > 0 ? "Get propertype success" : "Get failure",
      data: rs && rs,
    });
  }

  // Pagination
  const prevPage = page - 1 > 0 ? page : 1;

  const offset = (prevPage - 1) * limit + 1; // start of page

  if (offset) options.offset = offset;
  options.limit = +limit;

  const response = await db.PropertyType.findAndCountAll({
    where: query,
    ...options,
  });

  return res.json({
    statusCode: response?.length > 0 ? 200 : 400,
    success: response?.length > 0 ? true : false,
    message: response?.length > 0 ? "Get propertype success" : "Get failure",
    data: response && response,
  });
});

exports.updatePropertyType = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const rs = await db.PropertyType.update(req.body, {
    where: { id },
  });

  return res.json({
    statusCode: rs[1],
    success: rs ? true : false,
    message: rs ? "update property success" : "update property failure",
  });
});

exports.removePropertyType = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const rs = await db.PropertyType.destroy({
    where: { id },
  });

  return res.json({
    statusCode: rs > 0 ? 203 : 400,
    success: rs > 0 ? true : false,
    message: rs > 0 ? "delete property success" : "delete property failure",
  });
});
