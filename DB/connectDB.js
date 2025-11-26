import { Sequelize } from 'sequelize';
import path from 'path';

// SQLite Database Configuration - File-based database (No server needed!)
// Database file will be created automatically in the project root
const dbPath = path.join(process.cwd(), 'job_portal.db');

// Create Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,  // Database file path
    logging: console.log,   // Enable SQL query logging
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Connect to database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ SQLite Database connected successfully');
        
        // Sync all models (creates tables if they don't exist)
        await sequelize.sync({ alter: false });
        console.log('✅ All database tables ready');
        
        return true;
    } catch (error) {
        console.log('❌ Database connection error:', error.message);
        return false;
    }
};

export default connectDB;
export { sequelize };