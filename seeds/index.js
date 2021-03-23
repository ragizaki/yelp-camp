const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'Connection error.'));
mongoose.connection.once('open', () => {
    console.log('Connected to the database.');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 1;
        const camp = new Campground({
            author: '603c81d03842633fb8cdb704',
            location: `${cities[randomIndex].city}, ${cities[randomIndex].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483521',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda repellat illum hic, cupiditate iure omnis enim voluptatem mollitia fugiat. Placeat quasi unde cupiditate, ex iure laborum debitis nam cumque quas',
            price,
        });
        await camp.save();
    }
};

seedDB()
    .then(() => {
        mongoose.connection.close();
    })
    .catch(() => {
        console.log('Could not seed the database.');
    });
