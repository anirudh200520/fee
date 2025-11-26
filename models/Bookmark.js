import { DataTypes } from 'sequelize';
import { sequelize } from '../DB/connectDB.js';
import User from './User.js';
import Job from './Job.js';

const BookMarkJob = sequelize.define('BookMarkJob', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'jobs',
            key: 'id'
        }
    }
}, {
    tableName: 'bookmarks',
    timestamps: true
});

// Define associations
BookMarkJob.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
BookMarkJob.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

export default BookMarkJob;