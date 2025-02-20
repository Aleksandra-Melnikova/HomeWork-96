import express from "express";
import {imagesUpload} from "../multer";
import User from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";
import { Error } from "mongoose";


const usersRouter = express.Router();


usersRouter.post('/register',imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            image: req.file ? 'images' + req.file.filename : null,
        });

        user.generateToken();

        await user.save();
        res.send({user, message: "Register success"});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            res.status(400).send({error: 'Invalid email.'});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: 'Invalid password'});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({message: 'You have successfully logged in!', user});

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

usersRouter.delete('/sessions', auth, async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;
    console.log(userFromAuth);
    try {
        const user = await User.findOne({_id: userFromAuth._id});

        if (user) {
            user.generateToken();
            await user.save();
            res.send({message: 'You have successfully logged out.'});
        }
    } catch (e) {
        next(e);
    }
});



export default usersRouter;
