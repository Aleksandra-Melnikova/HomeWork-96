import mongoose from "mongoose";


const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
});

const CoctailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    price: {
        type: Number,
        required: true,
    },
   receipt:  {
       type: String,
       required: [true, 'Receipt is required'],
   },
    image: {
        type: String,
        required: [true, 'User is required'],
    },
    isPublished:{
        type: Boolean,
        default: false,
    },
    ingredients: [IngredientSchema],
});

const Coctail = mongoose.model('Coctail', CoctailSchema);
export default Coctail;