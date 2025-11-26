import ConnectDB from '@/DB/connectDB';
import Job from '@/models/Job';
import User from '@/models/User';

export default async (req, res) => {
    await ConnectDB();
    const { method } = req;
    switch (method) {
        case 'GET':
            await getAllJobs(req, res);
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}

const getAllJobs = async (req, res) => {
    await ConnectDB();
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;

        const { count, rows: jobs } = await Job.findAndCountAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }],
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            success: true,
            data: jobs,
            total: count,
            page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.log('Error in getting a job (server) => ', error);
        return res.status(500).json({ success: false, message: "Something Went Wrong Please Retry login  !" });
    }
}