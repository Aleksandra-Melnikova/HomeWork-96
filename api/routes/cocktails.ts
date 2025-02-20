import express from "express";
import {imagesUpload} from "../multer";
import { CocktailWithoutId, Ingredients} from "../types";
import Cocktail from "../models/Cocktail";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const cocktailsRouter = express.Router();


cocktailsRouter.get('/', async (req, res, next) => {
    try {
        const idQuery = req.query.userID as string;
        if(idQuery){
            const cocktails = await Cocktail.find({user: idQuery}).select('name image _id isPublished');
            res.send(cocktails);}
        else{
            const cocktails = await Cocktail.find().select('name image _id isPublished');
            res.send(cocktails);
        }} catch (e) {
        next(e);
    }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error:"Not found"});
    }

    try {
        const cocktail = await Cocktail.findById(id);

        if (!cocktail) {
            res.status(404).send({error:"Cocktail not found"});
        }
        res.send(cocktail);

    } catch (e) {
        next(e);
    }
});


cocktailsRouter.post('/', imagesUpload.single('image'), auth, permit('admin','user'), async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;

    const parsedIngredients = req.body.ingredients? JSON.parse(req.body.ingredients):[];

    const newCocktail:  CocktailWithoutId  = {
        user:  (userFromAuth._id).toString(),
        name: req.body.name as string,
        receipt: req.body.receipt as string,
        image:'images' + req.file?.filename,
        ingredients: parsedIngredients,
    };

    try {
        const cocktail = new Cocktail(newCocktail);
        await cocktail.save();
        res.send(cocktail);
    }

    catch (e) {
        next(e);
    }
});

cocktailsRouter.delete('/:id', auth, permit("admin") ,async (req, res, next) => {
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) {
        res.status(404).send({error: 'Cocktail not found'});
    }
    else{
        try{
            await Cocktail.deleteOne({_id: req.params.id});
            res.send({message: "Cocktail was deleted successfully."});
        } catch(error){
            next(error);
        }}
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {

    try {
        const cocktail = await Cocktail.findOne(
            {_id: req.params.id}
        );

        if (!cocktail) {
            res.status(403).send({error: "Cocktail not found"});
            return;
        }

        const updateCocktail = await Cocktail.findOneAndUpdate(
            {_id: req.params.id},
            {isPublished: !cocktail.isPublished},
            {new: true}
        );
        res.send(updateCocktail);
    } catch (e) {
        next(e);
    }
});

export default  cocktailsRouter;
