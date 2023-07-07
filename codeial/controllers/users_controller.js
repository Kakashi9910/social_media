import User from '../models/user.js';
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve();

export function profile(req, res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        });
    })
   
}
export async function update(req,res){  
        if(req.user.id==req.params.id){
            try{
         let user=await User.findByIdAndUpdate(req.params.id)
         User.uploadedAvatar(req,res,function(err){
               if(err){
                console.log("****multer error",err);
               }
               user.name=req.body.name;
               user.email=req.body.email;
               if(req.file){
                // if(user.avatar){
                //     fs.unlinkSync(path.join(__dirname,'.',user.avatar))
                // }
                user.avatar=User.avatarPath+'/'+req.file.filename;
               }
               user.save();
               return res.redirect('back')
            }) 
        }catch(error){
            return res.redirect('back');
        }

        }

}

// render the sign up page
export function signUp(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
export function signIn(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
export function create(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
export function createSession(req, res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

export function destroySession(req, res){
    req.logout();
    req.flash('success','Logged out successfully');

    return res.redirect('/');
}