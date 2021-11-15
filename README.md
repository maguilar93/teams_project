# TEMPO TECHNICAL TEST

Front-end developer exercise

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`

Runs the tests for each component

## How I approached the problem

1. In order to start, I needed to get all the teams that existed. To do that, I fetch the data from the API every time it is loaded.
2. Then, when the name of the team is clicked, the state of the current team changes and the page changes dynamically to show the information about the team. I made it change dynamically because we are gonna be passing props, such as team id's and user id's.
3. Once the teams info was loaded, I repeated the same steps with the user details.
4. Once this was completed, I added the search field and changed the logic so when there is input, the results will change dynamically.

## Important information

- Since all the pages have props being passed down except the teams page, I only use routing for the main application.
- Also, I executed some tests with Jest to make sure that the main components don't crash.
- Since the state management is not required Redux, I handled all the states locally, since there wasn't any variable that we need across the whole web app.
- As for the design, I made it very basic since it wasn't really required.
- All my components are inside the folder _components_ and I created only one CSS file since it wasn't much.
- As for the tests, you will find them inside _**tests**_ inside the _components_ folder.
