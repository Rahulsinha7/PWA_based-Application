import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret-key', {
        expiresIn: '90d'
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    user.password = undefined; 

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user }
    });
};

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;

        const newUser = await User.create({
            firstName,
            lastName,
            emailId,
            password
        });

        createSendToken(newUser, 201, res);
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
        }

        const user = await User.findOne({ emailId }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
        }

        createSendToken(user, 200, res);
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
