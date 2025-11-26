import { DataTypes } from 'sequelize';
import { sequelize } from '../DB/connectDB.js';
import User from './User.js';
import Job from './Job.js';

const AppliedJob = sequelize.define('AppliedJob', {
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
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cv: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    }
}, {
    tableName: 'applied_jobs',
    timestamps: true
});

// Define associations
AppliedJob.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
AppliedJob.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

export default AppliedJob;