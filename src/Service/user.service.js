const usersModel = require('../Models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'bookmyshowsecretclone';

const { success, failure } = require('../Utils/helper');

const findUserByEmail = async (email) => {
    try {
        const user = await usersModel.findOne({
            email: email.toLowerCase()
        })
        return user;
    }
    catch (error) {
        console.log(error);
        return;
    }
}

const signUp = async (email, password) => {
    try {
        const userCheck = await findUserByEmail(email);
        if (userCheck) return failure({ error: 'user already exists' }, 'user exists, please sign in to continue..')
        const hashPassword = await bcrypt.hash(password, saltRound);
        const userCreate = new usersModel({
            email: email.toLowerCase(),
            password: hashPassword
        });
        const signInUser = await userCreate.save();
        return success(signInUser, 'user created successfully');
    }
    catch (error) {
        console.log(error);
        return failure({error: error}, 'Failed to create user');
    }
}

const signIn = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
    
        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                const authToken = jwt.sign({
                    email: user.email,
                    id: user.id
                }, JWT_SECRET, { expiresIn: '10hrs' });
                return success({ authToken: authToken }, 'user logged in successfully')
            }
            return failure({ error: 'wrong password' }, 'incorrect password')
        }
        return failure({ error: 'user not found' }, 'user not found');
    }
    catch (error) {
        console.log(error);
        return failure({error: error}, 'Failed to login user')
    }
}

module.exports = {
    signUp,
    signIn
}