# Recipe App using React js and Tailwind CSS [DEMO](https://recipe-app-38737.web.app/)

### Introduction
Welcome to Recipe App, a web application built using React. This application allows you to easily manage your recipes and keep track of your favorite dishes. With Recipe App, you can create an account, add and remove recipes, add bookmarks, and more.

### Features
Recipe App includes the following features:

&bull; Firebase Authentication: You can create an account and sign in to Recipe App using your email and password.<br>
&bull; Formik: A library that allows you to easily create forms in React.<br>
&bull; Adding and Removing Recipes: You can add your own recipes to Recipe App and remove them as needed.<br>
&bull; Adding Bookmarks: You can save your favorite recipes as bookmarks to easily access them later.<br>
&bull; Creating an Account: You can create an account to access all of Recipe App's features.<br>
&bull; Showing Your Own Recipe: If you have created an account, you can add a recipe and view your own recipe. No one else will be able to view your recipe except you.<br>

### Getting Started
To use Recipe App, follow these steps:

1. Clone the repository to your local machine using git clone https://github.com/ahmad-1212/recipe-app.git.
2. Create a .env file in the root of your project directory.
3. Generate an API key by visiting https://forkify-api.herokuapp.com/v2 and sign up for a new account if necessary.
4. In your .env file, assign your new API key to the REACT_APP_RECIPE_API_KEY variable like so:<br>
   ```REACT_APP_RECIPE_API_KEY=your-api-key-goes-here``` <br>
5. Create a new project on Firebase and retrieve your Firebase configuration values.
6. In your .env file, assign your Firebase configuration values to the following variables:
 ```REACT_APP_FIREBASE_API_KEY=your-api-key```<br>
```REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain```<br>
```REACT_APP_FIREBASE_PROJECT_ID=your-project-id```<br>
```REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket```<br>
```REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id```<br>
```REACT_APP_FIREBASE_APP_ID=your-app-id```<br>
7. Install the necessary dependencies using npm install.
8. Run the development server using npm start.
9. Open the application in your web browser by navigating to http://localhost:3000.

If you would like to deploy Recipe App to a production server, you can run the following command:

Copy code
```bash 
npm run build```<br>

This will create a production-ready version of Recipe App in the build directory. You can then deploy this directory to your production server using any hosting service.


### Technologies Used
Recipe App was built using the following technologies:

&bull; React: A JavaScript library for building user interfaces.<br>
&bull; Firebase Authentication: A service that allows you to add user authentication to your app.<br>
&bull; Formik: A library that allows you to easily create forms in React.<br>
&bull; Framer-motion: A library that allows you to easily create animations.<br>
&bull; React-icons: A library that allows you to easily add icons to your app.<br>

## Conclusion

Thank you for using Recipe App! We hope you find it useful for managing your recipes and discovering new dishes. If you have any feedback, suggestions, or questions, please feel free to contact us. We would love to hear from you!
