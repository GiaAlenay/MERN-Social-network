import User from "../models/User.js"
export const getUser=async(req,res)=>{
    try {
       const {id}=req.params;
       const findUser= await User.findById(id) 
       res.status(201).json(findUser)
    } catch (error) {
        res.status(501).json({error:error.message})
    }
}

export const getUserFriends=async(req,res)=>{
    try {
        const {id}=req.params
        const findUser=await User.findById(id)

        const friends= await Promise.all(findUser.friends.map((id)=> User.findById(id)))
        
        const formattedFriends= friends.map(
            ({_id,
                firstname,
                lastname,
                picturePath,
                location,
                ocuppation})=>{
                return {_id,
                    firstname,
                    lastname,
                    picturePath,
                    location,
                    ocuppation}
            }
        )
        res.Status(201).json(formattedFriends)

    } catch (error) {
        res.status(501).json({error:error.message})
    }
}

export const addRemoveFriends=async(req,res)=>{
    try {
        const {id,friendId}=req.params
 
        const findUser= await User.findById(id)
        const findFriend= await User.findById(friendId)

        if(findUser.friends.includes(friendId)){
            findUser.friends=findUser.friends.filter(id=>id!==friendId)
            findFriend.friends=findFriend.friends.filter(fid=>fid!==id)
        }else{
            findUser.friends.push(friendId)
            findFriend.friends.push(id)
        }
        await findUser.save()
        await findFriend.save()

        const friends= await Promise.all(findUser.friends.map((id)=> User.findById(id)))
        
        const formattedFriends= friends.map(
            ({_id,
                firstname,
                lastname,
                picturePath,
                location,
                ocuppation})=>{
                return {_id,
                    firstname,
                    lastname,
                    picturePath,
                    location,
                    ocuppation}
            }
        )
        res.Status(201).json(formattedFriends)
    } catch (error) {
        res.status(501).json({error:error.message})
    }
}