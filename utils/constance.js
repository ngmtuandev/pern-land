const bcrypt = require("bcrypt");
const faker = require("@faker-js/faker");

const hashPass = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

module.exports = {
  roles: [
    {
      code: "ROLE1",
      value: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: "ROLE2",
      value: "Owner",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: "ROLE3",
      value: "Agent",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: "ROLE4",
      value: "Customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  users: Array.from([...Array(10).keys()]).map((el) => ({
    name: `nguyen van ${el}`,
    phone: `036307347${el}`,
    email: `nguyenvan${el}@gmail.com`,
    address: `address ${el}`,
    password: hashPass("111111"),
    avatar: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  user_roles: [
    ...Array.from([...Array(10).keys()]).map((el) => ({
      userId: el + 1,
      roleCode: "ROLE4",
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    {
      userId: 1,
      roleCode: "ROLE1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      roleCode: "ROLE2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 3,
      roleCode: "ROLE3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};
