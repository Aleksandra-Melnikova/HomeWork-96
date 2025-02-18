import mongoose from "mongoose";
import config from "./config";



const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('coctails');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not presents, skipping drop ');
    }

    // const [Maria, Ivan] = await Category.create(
    //     {
    //         title: 'CPU',
    //         description: 'Test desc for CPU'
    //     },
    //     {
    //         title: 'SSD',
    //         description: 'Test desc for SSD ...'
    //     });
    //
    // await Cocktail.create({
    //         category: cpuCategory._id,
    //         title: 'Intel',
    //         price: 350,
    //         image: "fixtures/cpu.jpg",
    //     },
    //     {
    //         category: cpuCategory._id,
    //         title: 'Apple',
    //         price: 700,
    //     },
    //     {
    //         category: SSDCategory._id,
    //         title: 'Lenovo',
    //         price: 500,
    //         image: "fixtures/ssd.jpg",
    //     });
    //
    // await User.create({
    //         username: "Jane",
    //         password: "123",
    //         token: randomUUID(),
    //         role: "admin",
    //     },
    //     {
    //         username: "John",
    //         password: "123",
    //         token: randomUUID(),
    //         role: "user",
    //     });

    await db.close();
};

run().catch(console.error);