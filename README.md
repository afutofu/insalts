# Insalts

Website Link: [https://insalts.herokuapp.com](https://insalts.herokuapp.com/)

A site for your favorite jokes and insults. Inspired by Reddit, Insalts offers a place to view jokes and insults the community have posted. Check out 'salts' (subreddits) to view posts of a specific category, or create your very own and start posting your own jokes!

## How to run

First install dependencies.
In root directory and client directory, run:

### `npm install`

To run the app locally, on root directory run:

### `npm start`

To run the server and client separately, on root directory run:

### `npm run server`

and

### `npm run client`

respectively.

Technologies used:

- [React](https://reactjs.org/) - Frontend framework
- [Redux](https://redux.js.org/) - State container for managing cart system, authentication
- [Styled Components](https://styled-components.com/) - CSS styling written into custom components, gets rid of having to use separate css files
- [Node.js](https://nodejs.org/en/) - Backend runtime environment
- [Express](https://expressjs.com/) - API for fetching and storing data to database
- [Sequelize](https://sequelize.org/) - Node.js ORM for MySQL database
- [MySQL](https://www.mongodb.com/) - Database
- [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) - Reliable authentication

Features in this version:

- User authentication
- Creating, editing, and deleting salts
- Joining and leaving salts
- Creating, editing, and deleting posts

Future implementations:

- Commenting on posts
