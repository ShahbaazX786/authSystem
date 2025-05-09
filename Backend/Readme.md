## AuthSystem

- Sole purpose of this is to just give me a quick help in creating a backend solution for my frontend projects.

- Though i like using 3rd party auth solutions like clerk.js or auth.js but still it was not having the vibe to it.

- This is custom built according to my expectations. and I don't need to worry about pricing / limits etc.

- Though there are limits to few smtp services but its still better than using 3rd party services in my view.

### ENV File:

APP_NAME=AuthSystem
MONGODB_URI= either use local port like mongodb://localhost:27017/yourCollectionName or use mongodb Atlas url.
PORT= your favorite port number.
JWT_SECRET= any string is fine as long as its doing the work.
NODE_ENV= will be either production or development.
SENDER_EMAIL= your gmail here
SENDER_PASSWORD= your gmail app password here (create it in manage security tab of your google account).
