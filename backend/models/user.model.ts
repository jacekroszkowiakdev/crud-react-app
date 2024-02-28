import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUserDocument extends mongoose.Document {
    username: string;
    email: string;
    password: string;
}

const UserSchema: mongoose.Schema<IUserDocument> = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
});

UserSchema.pre("save", async function (next) {
    const user = this;
    const SALT_WORK_FACTOR = 10;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// UserSchema.methods.comparePassword = function (candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);
