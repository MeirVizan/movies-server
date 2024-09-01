import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const jwtSecret = 'your_jwt_secret'; // Replace with your actual secret


export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    console.log(' name, email, password', name, email, password)

    try {
        let user: IUser | null = await User.findOne({ email });
        if (user) {
            res.status(400).json({ msg: 'User already exists' });
            return;
        }

        user = new User({ id: new mongoose.Types.ObjectId().toString(), name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
        jwt.sign(payload, jwtSecret, { expiresIn: '5m' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token });
        });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    console.log('req.body :>> ', req.body);
    try {
        let user: IUser | null = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;
        }

        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };

        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find();
        res.json(users);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser | null = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }
        res.json(user);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
        let user: IUser | null = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }

        user = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });

        res.json(user);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    // try {
    //     let user: IUser | null = await User.findById(req.params.id);
    //     if (!user) {
    //         res.status(404).json({ msg: 'User not found' });
    //         return;
    //     }

    //     await User.findByIdAndRemove(req.params.id);

    //     res.json({ msg: 'User removed' });
    // } catch (err : any) {
    //     console.error(err.message);
    //     res.status(500).send('Server error');
    // }
};

