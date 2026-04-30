import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

interface UserAttributes {
  id: number;
  fullname: string;
  username: string;
  email: string;
  password: string;
  logo?: string | null;
  premium: boolean;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "logo" | "premium">;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public fullname!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public logo!: string | null;
  public premium!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    premium: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);
