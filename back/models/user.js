/**
 * 사용자정보
 */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('tb_user',{
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING
    }
  },
  {
    indexes : [
      { 
        name : 'idx_user_email',
        fields:['email']
      },
      { 
        name : 'idx_user_name',
        fields:['name']
      }
    ]
  }, 
  {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
  }
  );  
  return User;
};