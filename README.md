# rpg
Role Playing Game

# Running development server
To run this app in development, you will need to:
1. Set up a Mongo database (see https://mlab.com).
2. In development, rename the file **RENAME-TO-keys_dev.js** to **keys_dev.js**.
3. In **keys_dev.js**, replace the _mongoURI_ and _secretOrKey_ values with, respectively, the URI for your Mongo database and the secretOrKey to be used with JWT authentication.
4. From the top level of the directory, run the command _npm run dev_. This will start the server on env.process.PORT or 8080, and the client will run on port 3000.
