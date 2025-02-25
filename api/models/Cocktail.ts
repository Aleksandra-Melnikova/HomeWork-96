import mongoose from "mongoose";


const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
   receipt:  {
       type: String,
       required: [true, 'Receipt is required'],
   },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    isPublished:{
        type: Boolean,
        default: false,
    },
    ingredients: [{
        title: {type: String, required: true},
        quantity: {type: Number, required: true},
    }]
});

const Cocktail = mongoose.model('Cocktail',  CocktailSchema);
export default Cocktail;