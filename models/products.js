module.exports = (sequelize, DataTypes) => {
var Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: Sequelize.STRING
}, {
  tableName: 'products',
  timestamps: false
})
{});
Product.associate = function(models) {
    // associations can be defined here
  };
  return Player;
};
