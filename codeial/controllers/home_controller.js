import Post from '../models/post.js';
import User from '../models/user.js';
export function home(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        User.find({},function(err,users){
            return res.render('home',{
                title:"Codeial home",
                posts:posts,
                all_users:users
            })
        })
       
    })

}

// module.exports.actionName = function(req, res){}