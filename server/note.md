npx sequelize-cli model:generate --name Task --attributes id:integer,title:string,description:string,isCompleted:boolean


npx sequelize-cli db:migrate



 title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title cannot be null'
        },
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    },
    description: DataTypes.STRING,
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Task',
  });