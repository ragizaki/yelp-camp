# YelpCamp

YelpCamp is a Node.js web application project where users can upload and review campgrounds.

## Live Demo

To use the app, go to [https://cryptic-garden-68428.herokuapp.com/](https://cryptic-garden-68428.herokuapp.com/)
The app was deployed using [Heroku](https://heroku.com) and uses [Mongo Atlas](https://www.mongodb.com/cloud/atlas)

## Features

<ul>
  <li>Basic user campground functionality
    
    <ul>
      <li>Create, edit, remove campgrounds</li>
      
      <li>Create, edit, and delete reviews on campgrounds</li>
      
      <li>Upload multiple campgrounds photos to a post</li>
      
      <li>Display campground with marker on a map</li>
      
    </ul>
  </li>
   <li>Authentication and Authorization
  
    <ul>
      <li>Cannot edit or delete campgrounds and reviews from other users</li>
      
      <li>Cannot manage or create campgrounds without being logged in</li>
      
    </ul>
  </li>
   <li>Map and geolocation functionality
  
    <ul>
      <li>Cluster map on home page showing all the created campgrounds</li>
      
      <li>Map on each individual post with a marker on the campground's location</li>
      
    </ul>
  </li>
</ul>

## Getting Started

### Clone this repository

```bash
git clone https://github.com/ragizaki/yelpcamp.git
```

### Install Dependencies

```bash
npm install
```

## Technologies Used

## Frontend
<ul>
  <li><a href="https://getbootstrap.com/">Bootstrap</a></li>
  <li><a href="https://ejs.co/">ejs</a></li>
  <li><a href="https://www.mapbox.com/">MapBox</a></li>
</ul>

## Backend
<ul>
  <li><a href="https://expressjs.com/">Express</a></li>
  <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  <li><a href="https://mongoosejs.com/">Mongoose</a></li>
  <li><a href="http://www.passportjs.org/">Passport</a></li>
  <li><a href="https://www.npmjs.com/package/passport-local">passport-local</a></li>
  <li><a href="https://www.npmjs.com/package/connect-flash">connect-flash</a></li>
  <li><a href="https://www.npmjs.com/package/express-session">express-session</a></li>
  <li><a href="https://cloudinary.com/">Cloudinary</a></li>
  <li><a href="https://helmetjs.github.io/">Helmet</a></li>
</ul>

## License
[MIT](https://choosealicense.com/licenses/mit/)

