import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email ID: " + value);
            }
        }
    },
    age: {
        type: Number,
        min: 0,
        max: 50,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
   
    password: {
        type: String,
        required: true,
        select: false
    },
}, {
    timestamps: true,
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("user", userSchema);
export default User;