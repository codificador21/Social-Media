const Post = require('../models/posts');
const Comment = require('../models/comments')

module.exports.create = (function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){ console.log('Error in creating a post'); return; }

        return res.redirect('back');

    });
});

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        //.id means converting the object _id into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({ post: req.params._id }, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }

    });
}