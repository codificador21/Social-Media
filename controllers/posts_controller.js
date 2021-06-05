const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/like');

module.exports.create = async function(req,res){
    
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if(req.xhr){
            post = await post.populate('user','name email avatar').execPopulate();
            return res.status(200).json({
                data:{
                    post: post
                },
                message: "post created!"
            });
        }        

        req.flash('success','Post published');
        return res.redirect('back');
    }catch(err){
        console.log("Error",err);
        return res.redirect('/');
    }
};

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        //.id means converting the object _id into string
        if(post.user == req.user.id){

            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id:{$in: post.comments}});

            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success','Post Deleted');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error",err);
        return res.redirect('/');
    }

    
}