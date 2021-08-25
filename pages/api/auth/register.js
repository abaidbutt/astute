import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import valid from '../../../utils/valid'
import bcrypt from 'bcrypt'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try{
        const { Name, email, password ,check} = req.body
                        
        const errMsg = valid(Name, email, password)
        if(errMsg) return res.status(400).json({err: errMsg})

        const user = await Users.findOne({ email })
        if(user) return res.status(400).json({err: 'This email already exists.'})

        const hash_password = await bcrypt.hash(password, 12)

        const newUser = new Users({ 
            Name, email, hash_password ,adminRequest:check
        })

        await newUser.save()
        res.json({msg: "Register Success!"})

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}