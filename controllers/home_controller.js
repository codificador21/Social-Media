const Post = require('../models/posts');
const User = require('../models/user')

//async await
module.exports.home = async function(req,res){
 
    try{
        //populate the user of wach post
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    });
    let users =  await User.find({});
    
        return res.render('home',{
            title: "Social Media | Home",
            posts: posts,
            all_users:users
        });
        
    }catch(err){

        console.log('Error',err);
        return;

    }

    
    
}