const asyncHandler = require("express-async-handler");
const db = require("../models");
const { where } = require("sequelize");

exports.getInfoUser = asyncHandler(async (req, res) => {
  const { uid } = req.user;

  const rs = await db.User.findByPk(uid, {
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: db.User_Role,
        attributes: ["roleCode"],
        as: "rolesUser",
        include: [
          {
            model: db.Role,
            attributes: ["value"],
            as: "value",
          },
        ],
      },
    ],
  });

  const transformedRolesUser = rs.rolesUser.map((role) => ({
    roleCode: role.roleCode,
    value: role.value.value,
  }));

  const userCurrent = {
    ...rs.toJSON(),
    rolesUser: transformedRolesUser,
  };

  return res.json({
    statusCode: rs ? 200 : 400,
    success: rs ? true : false,
    message: rs ? "Get user current success" : "Get user failure",
    userCurrent: userCurrent,
  });
});

exports.getRoles = asyncHandler(async (req, res) => {
  const response = await db.Role.findAll({
    attributes: ["id", "code", "value"],
  });
  return res.json({
    success: Boolean(response),
    message: response ? "Get all role success" : "Get role failure",
    data: response,
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { fullName, email, address, image } = req.body;
  const { uid } = req.user;
  const dataUpdateUser = new Object();

  if (image) dataUpdateUser.avatar = image;
  if (fullName) dataUpdateUser.name = fullName;
  if (email) dataUpdateUser.email = email;
  if (address) dataUpdateUser.address = address;

  try {
    const resultUpdateUser = await db.User.update(dataUpdateUser, {
      where: { id: uid },
    });
    return res.json({
      success: resultUpdateUser[0] > 0 ? true : false,
      message:
        resultUpdateUser[0] > 0
          ? "Updated user success"
          : "Update user failure",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Update user failure",
    });
  }
});
