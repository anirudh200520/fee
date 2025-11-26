import ConnectDB from '@/DB/connectDB';
import validateToken from '@/middleware/tokenValidation';
import AppliedJob from '@/models/ApplyJob';
import User from '@/models/User';




export default async (req, res) => {
    await ConnectDB();
    const { method } = req;
    switch (method) {
        case 'GET':
            await validateToken(req, res, async () => {
                await getAllApplicationsOfSpecifiedJob(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}


const getAllApplicationsOfSpecifiedJob =  async (req, res) => {
    await ConnectDB();
    const data = req.query;
    const id = data?.id

    if(!id) return res.status(400).json({ success: false, message: "Please Login" })

    try {
        const gettingjobs = await AppliedJob.findAll({
            where: { job_id: id },
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }],
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json({ success: true, data: gettingjobs })
    } catch (error) {
        console.log('Error in getting a specifed Job job (server) => ', error);
        return res.status(403).json({ success: false, message: "Something Went Wrong Please Retry login  !" })
    }
}