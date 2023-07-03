// const Post = require('../models/post').default
import Post from '../models/post.js'
import Comment from '../models/comment.js';
// const Post=p.default;

export  function create(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
}

export function destroy(req,res){
    Post.findById(req.params.id,function(err,post){
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(error){
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');

        }
    })
}