const Post = require('../models/posts');
const User = require('../models/user')


module.exports.home = function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Social Media | Home",
    //         posts: posts
    //     });
    // });

    //Populate the user of each post.(mongoose populate)
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err,posts){

        User.find({},function(err,users){
            return res.render('home',{
                title: "Social Media | Home",
                posts: posts,
                all_users:users
            });
        })

        
    });
}