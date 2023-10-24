const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Platform', {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   }, { timestamps: false });
};
