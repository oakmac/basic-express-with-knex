# Basic express.js app using knex.js

A very basic [express.js] application using [knex.js].

[express.js]:https://expressjs.com/
[knex.js]:http://knexjs.org/

## Development Setup

```sh
# installs node_modules/ folder
npm install

# initialize database schema to latest migration
npx knex migrate:latest

# initialize database with seed data
npx knex seed:run

# start express.js server on port 3000
node index.js
```

## License

[ISC License](LICENSE.md)
