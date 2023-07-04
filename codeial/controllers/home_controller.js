import Post from '../models/post.js';
import User from '../models/user.js';
export async function home(req, res){
   
    try{
    // populate the user of each post
    const posts=await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
   const users= await User.find({});
   
   return res.render('home',{
    title:"Codeial home",
    posts:posts,
    all_users:users
})
    }
    catch(error){
       return res.status(500).json({msg:error.message});
    }
}

// module.exports.actionName = function(req, res){}