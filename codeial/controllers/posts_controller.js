// const Post = require('../models/post').default
import Post from '../models/post.js'
import Comment from '../models/comment.js';
// const Post=p.default;

export async function create(req, res){
   try{
    let post =await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post,  
            },
            message:'Post created'
        })
    }
   } catch(error){
     return res.redirect('back')
   }
}

export async function destroy(req,res){
    try{
    let post=await Post.findById(req.params.id)
    if(post.user==req.user.id){
        post.remove();
        await Comment.deleteMany({post:req.params.id})
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.param.id
                },
                message:"Post deleted"
            })
        }
        else{
            return res.redirect('back');
        }

    }
}catch(error){
      return res.redirect('back');
}
}