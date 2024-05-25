const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
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
    {
      userId: 4,
      roleCode: "ROLE2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  property_type: [
    {
      name: "Department",
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "Apartment",
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Apartment",
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "Apartment",
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "House",
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "House",
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  property: Array.from([...Array(60).keys()]).map(() => ({
    name: faker.lorem.sentences({ max: 1 }).replace(".", ""),
    description: faker.lorem.sentences({ min: 5, max: 10 }),
    listingType: faker.helpers.arrayElement(["SALE", "RENTAL"]),
    price: faker.number.int({ max: 100000, min: 1000 }),
    propertyTypeId: faker.number.int({ max: 3, min: 1 }),
    owner: faker.helpers.arrayElement([2, 4]),
    status: "PENDING",
    isAvailable: true,
    images: JSON.stringify(
      Array.from([...Array(faker.number.int({ max: 7, min: 5 })).keys()]).map(
        () =>
          `${faker.image.urlLoremFlickr({
            category: "real-land",
          })}?random=${faker.string.numeric(30)}`
      )
    ),
    postedBy: faker.helpers.arrayElement([2, 4]),
    bedRoom: faker.number.int({ max: 3, min: 1 }),
    bathRoom: faker.number.int({ max: 3, min: 1 }),
    yearBuilt: faker.number.int({ max: 2024, min: 2000 }),
    featuredImage: faker.image.urlLoremFlickr({category: 'real-land'}),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  feature: [
    {
      name: "Air condition",
      image: faker.image.urlLoremFlickr({ category: "Air condition" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Television",
      image: faker.image.urlLoremFlickr({ category: "Television" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Refregiration",
      image: faker.image.urlLoremFlickr({ category: "Refregiration" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  property_feature: Array.from([...Array(60).keys()]).map((el) => ({
    propertyId: el + 1,
    featureId: faker.number.int({ max: 3, min: 1 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
};
