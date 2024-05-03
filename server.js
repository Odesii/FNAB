const express = require('express');
const { sequelize } = require('./models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./routes');  // This line imports the centralized routes module
const exphbs = require('express-handlebars');


const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: 'super secret string', // You should move this to .env in production
    store: new SequelizeStore({
        db: sequelize,
    }),
    resave: false,
    saveUninitialized: true,
}));

// Use centralized routes
app.use(routes);  // Using the centralized routes here

// Start the server
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await sequelize.sync(); // Sync models with the database
    console.log('Database synced!');
});

module.exports = app;
