import ConnectDB from '@/DB/connectDB';
import validateToken from '@/middleware/tokenValidation';
import AppliedJob from '@/models/ApplyJob';
import Job from '@/models/Job';
import User from '@/models/User';


export default async (req, res) => {
    await ConnectDB();
    const { method } = req;
    switch (method) {
        case 'GET':

            await getApplicationDetail(req, res);

            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}



const getApplicationDetail = async (req, res) => {
    const data = req.query;
    const id = data?.id

    if (!id) return res.status(400).json({ success: false, message: "Please Login" })

    try {
        const getApplicationDetails = await AppliedJob.findByPk(id, {
            include: [
                {
                    model: Job,
                    as: 'job',
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'email']
                    }]
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });
        return res.status(200).json({ success: true, data: getApplicationDetails })
    } catch (error) {
        console.log('Error in getting a specifed Job job (server) => ', error);
        return res.status(403).json({ success: false, message: "Something Went Wrong Please Retry login  !" })
    }
}