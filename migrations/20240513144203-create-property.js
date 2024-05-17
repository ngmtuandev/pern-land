'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()")
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      listingType: {
        type: Sequelize.ENUM(['SALE', 'RENTAL']),
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      propertyTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'PropertyTypes',
          key: 'id'
        }
      },
      owner: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.ENUM(['PENDING', 'CANCAL', 'APPROVED']),
        allowNull: false,
        defaultValue: 'PENDING'
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      postedBy: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      featuredImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      bedRoom: {
        type: Sequelize.INTEGER,
      },
      bathRoom: {
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.FLOAT,
      },
      yearBuilt: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Properties');
  }
};