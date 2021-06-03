const Comment = require('../models/comments');
const Post = require('../models/posts');
const { post } = require('../routes/posts');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailworker = require('../workers/comment_email_worker');
const queue = require("../config/Kue");

module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
                post.comments.push(comment);
                post.save();

                comment = await comment.populate('user','name email avatar').execPopulate();
                // commentsMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err){console.log('error in creating the queue',err); return;}

                console.log(job.id);
            })
                if(req.xhr){
                    
                    return res.status(200).json({
                        data:{
                            comment: comment
                        },
                        message: "COmment Posted!"
                    });
                }
                
                req.flash('success','Comment posted');
                
                res.redirect('back');
        
        }
    }    
        catch(err){
            console.log("Error",err);
            return res.redirect('/');
        }
}





module.exports.destroy = async function(req,res){
try{
    let comment = await Comment.findById(req.params.id);{
        if(comment.user == req.user.id || post.user==req.user.id){
            let postId = comment.post;
    
            comment.remove();
    
            //PULL IS AN INBUILT FUNCTION TO MONGOOSE
            let post = await Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id: req.params.id
                    },
                    message: "Comment Deleted!"
                });
            }

            req.flash('success','Comment deleted');    
            return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    }
}catch(err){
    console.log("Error",err);
    return res.redirect('/');
}
}