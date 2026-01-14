import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CourierAttributes {
  id: string;
  trackingNumber: string;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  status: 'pending' | 'picked' | 'in_transit' | 'delivered';
  paymentStatus: 'unpaid' | 'paid';
  userId: string;
}

interface CourierCreationAttributes
  extends Optional<
    CourierAttributes,
    'id' | 'status' | 'paymentStatus'
  > {}

class Courier
  extends Model<CourierAttributes, CourierCreationAttributes>
  implements CourierAttributes
{
  public id!: string;
  public trackingNumber!: string;
  public senderName!: string;
  public senderPhone!: string;
  public senderAddress!: string;
  public receiverName!: string;
  public receiverPhone!: string;
  public receiverAddress!: string;
  public status!: 'pending' | 'picked' | 'in_transit' | 'delivered';
  public paymentStatus!: 'unpaid' | 'paid';
  public userId!: string;
}

Courier.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    receiverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        'pending',
        'picked',
        'in_transit',
        'delivered'
      ),
      defaultValue: 'pending',
    },
    paymentStatus: {
      type: DataTypes.ENUM('unpaid', 'paid'),
      defaultValue: 'unpaid',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'couriers',
    modelName: 'Courier',
  }
);

export default Courier;
