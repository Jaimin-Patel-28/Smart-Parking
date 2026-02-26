const Admin = require('../models/Admin');
const {compareData} = require('../utils/hashHelper');
const {generateToken} = require('../utils/generateToken');

exports.adminLogin = async (req,res) => {
    try{

        const { email, password, adminKey } = req.body;

        const admin = await Admin.findOne ({email});

        if(!admin){
            return res.status(400).json({
                message: "Invalid Admin!"
            })
        }

        if(!admin.isActive){
            return res.status(403).json({
                message: "Admin is not active"
            })
        }

        const passwordMatch = await compareData(password, admin.password);
        if(!passwordMatch){
            return res.status(400).json({
                message: "Invalid password"
            })
        }

        const keyMatch = await compareData(adminKey, admin.adminKey);
        if(!keyMatch){
            return res.status(400).json({
                message: "Invalid admin key"
            })
        }

        const token = generateToken(
            {
                id: admin._id,
                role: admin.role,
            },
            "admin"
        );

        res.status(200).json({
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });
    }

    catch(error){
        res.status(500).json({
            message: `${error.message} Invalid credentials`
        })
    }
};