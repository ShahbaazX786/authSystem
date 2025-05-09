## AuthSystem

> Why?

- Sole purpose of this is to provide a plug and play backend solution for my frontend projects.

- Though i like using 3rd party auth solutions like clerk.js or auth.js but still it was not having real vibe to it.

- As this is custom built according to my expectations. and I don't need to worry about pricing / limits etc.

- Though there are limits to few smtp services but its still better than using 3rd party services in my view.

#### ENV File Contents:

```
APP_NAME= AuthSystem
MONGODB_URI= Refer Note #1
PORT= Note #2
JWT_SECRET= Note #3
NODE_ENV= Note #4
SENDER_EMAIL= Note #5
SENDER_PASSWORD= Note #6
```

#### Note:

1. Either use local port like mongodb://localhost:27017/yourCollectionName or use mongodb Atlas url.
2. Your favorite Port number (Mine is 7200).
3. Any string is fine as long as its doing the work. Even plain string is fine for local dev otherwise generate a 64bit hash if you want.
4. Will be either production or development based on current env.
5. Your gmail / email here.
6. Your gmail app password here.
   - This is different than your regular gmail password.
   - Create it in manage security tab of your google account.
   - Make sure 2-step verification is turned on and mobile is added before doing so.
