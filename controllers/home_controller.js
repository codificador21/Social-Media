const Post = require('../models/posts');



module.exports.home = function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Social Media | Home",
    //         posts: posts
    //     });
    // });

    //Populate the user of each post.(mongoose populate)
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: "Social Media | Home",
            posts: posts
        });
    });
}