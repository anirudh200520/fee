import { DataTypes } from 'sequelize';
import { sequelize } from '../DB/connectDB.js';
import User from './User.js';

const Job = sequelize.define('Job', {
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
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    company: {
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
    job_category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job_experience: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job_vacancy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    job_deadline: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'jobs',
    timestamps: true
});

// Define association
Job.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Job, { foreignKey: 'user_id' });

export default Job;