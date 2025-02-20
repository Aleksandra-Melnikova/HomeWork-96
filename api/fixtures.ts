import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "node:crypto";
import Cocktail from "./models/Cocktail";



const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('cocktails');
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
        isPublished:true,
            receipt: 'Pour rum, lime juice and simple syrup into a cocktail shaker. Add ice, cover and shake until chilled. Strain into a chilled glass.',
            image: "fixtures/Daiquiri.jpg",
            ingredients: [{title: "white rum", quantity: "60"}, {title: "lime juice", quantity: "30"}, {title: "sugar syrup", quantity: "5"},  {title: "crushed ice", quantity: "10"}]
        },
        {
            user: Jane._id,
           name: 'Manhattan',
            isPublished:true,
            receipt: 'Pour bourbon, vermouth and angostura into a cocktail shaker and shake. Place ice cubes in the glass and then strain the mixture from the shaker into it. Garnish the cocktail with a cherry.',
            image: "fixtures/Manhattan.jpg",
            ingredients: [{title: "bourbon", quantity: "50"}, {title: " red vermouth", quantity: "25"}, {title: "Angostura", quantity: "1"},  {title: "ice", quantity: "10"}]
        },
        {
            user: John._id,
            name: 'Boulevardier',
            isPublished:false,
            receipt: 'PFill a glass with ice. Pour in Campari, vermouth and bourbon or whiskey. Stir and garnish with a strip of zest.',
            image: "fixtures/Boulevardier.jpg",
            ingredients: [{title: "Campari", quantity: "30"}, {title: " sweet vermouth", quantity: "30"}, {title: "bourbon or rye whiskey", quantity: "40"},  {title: "orange zest", quantity: "10"}]
        },
        {
            user: John._id,
            name: 'Irish coffee',
            isPublished:true,
            receipt: 'Pour coffee into a tall glass and dissolve sugar in it. Add whiskey and stir. Place a teaspoon directly over the drink and carefully pour cream into it. This way, it will lie in an even layer on top of the cocktail.',
            image: "fixtures/IrishCoffe.jpg",
            ingredients: [{title: "hot coffee", quantity: "80"}, {title: " brown suga", quantity: "10"}, {title: "Irish whiskey", quantity: "40"},  {title: "whipped cream", quantity: "30"}]
        },
        );


    await db.close();
};

run().catch(console.error);