const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

//Sign in and create a session for the user
module.exports.create_session = async function(req,res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422,{
                message: "Invalid username/password"
            });

        }
        return res.json(200,{
            message:"Sign in successful, here is your token, please keep it safe",
            data:{
                token:jwt.sign(user.toJSON(),'socialmedia',{expiresIn: '100000'})
            }
        })

    }catch(err){
        return res.json(500,{
            message : "Internal server Error"
        });
    }

}