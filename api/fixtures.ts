import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "node:crypto";
import Cocktail from "./models/Cocktail";



const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('coctails');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not presents, skipping drop ');
    }

    const[Jane, John]=await User.create({
            email: "Jane@mail.com",
            password: "123",
            token: randomUUID(),
            role: "admin",
        displayName: "Jane",
        image: "fixtures/Jane1.jpg",

        },
        {
           email: "John@mail.com",
            password: "123",
            token: randomUUID(),
            role: "user",
            displayName: "John",
            image: "fixtures/John.webp",
        });




    await Cocktail.create({
            user: Jane._id,
            name: 'Daiquiri',
            receipt: 'Pour rum, lime juice and simple syrup into a cocktail shaker. Add ice, cover and shake until chilled. Strain into a chilled glass.',
            image: "fixtures/Daiquiri.jpg",
            ingredients: [{title: "white rum", quantity: "60"}, {title: "lime juice", quantity: "30"}, {title: "sugar syrup", quantity: "5"},  {title: "crushed ice", quantity: "10"}]
        },
        {
            user: Jane._id,
           name: 'Manhattan',
            receipt: 'Pour bourbon, vermouth and angostura into a cocktail shaker and shake. Place ice cubes in the glass and then strain the mixture from the shaker into it. Garnish the cocktail with a cherry.',
            image: "fixtures/Manhattan.jpg",
            ingredients: [{title: "bourbon", quantity: "50"}, {title: " red vermouth", quantity: "25"}, {title: "Angostura", quantity: "1"},  {title: "ice", quantity: "10"}]
        },
        );


    await db.close();
};

run().catch(console.error);