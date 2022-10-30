## Run from Packaged Exe

Run the exe prefixed with order- for your environment e.g. order-win for windows.
The application command is initiate-order-run with a space seperated list of the the order ids you wish to process.
$ order-win initiate-order-run 1122 1123 1124 1125

Alternatively you can build and run the app within NodeJS.

## Setting up the development environment

# Prerequisites
Node.js
npm package manager
nestjs CLI
$ npm install -g @nestjs/cli

# Load App Modules
Navigate to the the project root and run the command:
$ npm install

# Build the App
Run the nest build cmd.
$ nest build

# Run the App
Run the app using the node cmd.
The application command is initiate-order-run with a space seperated list of the the order ids you wish to process.
$ node ./dist/main initiate-order-run 1122 1123 1124 1125
