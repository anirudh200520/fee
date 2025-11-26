import ConnectDB from '@/DB/connectDB';
import validateToken from '@/middleware/tokenValidation';
import ApplyJob from '@/models/ApplyJob';
import User from '@/models/User';
import Job from '@/models/Job';



export default async (req, res) => {
    await ConnectDB();
    const { method } = req;
    switch (method) {
        case 'GET':
            await validateToken(req, res, async () => {
                await getAppliedJobs(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}



const getAppliedJobs =  async (req, res) => {
    await ConnectDB();

    const userId = req.query.id;
    
    if(!userId) return res.status(400).json({ success: false, message: "Please Login" })

    try {
        const gettingAppliedJobs  = await ApplyJob.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Job,
                    as: 'job',
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'email']
                    }]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json({ success: true, data : gettingAppliedJobs })
    } catch (error) {
        console.log('Error in getting applied  job (server) => ', error);
        return res.status(500).json({ success: false, message: "Something Went Wrong Please Retry login !" })
    }
}