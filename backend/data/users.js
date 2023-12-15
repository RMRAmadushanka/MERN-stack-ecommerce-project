import bcrypt from 'bcryptjs'

const users = [
    {
        name:'Admin User',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
    {
        name:'User',
        email:'User@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
    {
        name:'User2',
        email:'User2@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
]

export  default users;