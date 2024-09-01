import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    id: {
        type: String,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString(), // Generate a string representation of ObjectId
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
