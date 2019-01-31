# HatchDragons

I created this app for practice. It's based on the mobile app "DragonVale" by Backflip Studios.

## Run locally

You will need to install `yarn` and `concurrently` if not already installed.

Download and install:
```
git clone git@github.com:bananno/hatch-dragons.git
cd hatch-dragons
yarn install
cd ..
yarn install
```

Start the database and server in separate windows:
```
mongod
yarn dev
```

Local address will open automatically:
```
http://localhost:6200/
```
