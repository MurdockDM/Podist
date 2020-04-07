# Podist

An app for searching and organizing podcasts into list formats so that users can
more easily recommend podcasts to their friends.

---

## How to initialize this app

1. Install json-server

   ```shell session
   $ npm install -g json-server
   ```

2. Install package.json

   ```shell session
   $ npm install pkg.json
   ```

3. Clone the Github repository to your local machine.

   ```shell session
   $ git clone git@github.com:MurdockDM/Podist.git
   ```

4. In the root directory there should be a folder labeled api

   ```shell session
   $ cd api
   $ touch database.json
   ```

5. The database structure will need to be created as follows in a JSON format in
   the database.json file:
   ![ERD of Podist](src/photos/PodistERD.png)

6. Next install Material UI dependencies in order to view the styling for the app

   ```shell session
   $ npm install @material-ui/core
   $ npm install @material-ui/icons
   ```

7. An API key must be obtained from the [ListenNotes
   API](https://www.listennotes.com/api/). This key must then be put into a
   specific file.

   ```shell session
   $ cd src/components/modules
   $ touch ExternalAPIKey.js
   ```

   Place the following inside the ExternalAPIKey.js file

   ```shell session
   export default {
   myAPIKeyTitle: "X-ListenAPI-Key",
   myAPIKey: "Put your api key here"
   }

   ```

8. Open a tab in terminal and change to the api directory then start the
   json-server there

   ```shell session
   $ json-server -p 8088 -w database.json
   ```

9. Then in a separate tab in the terminal initialize the app

   ```shell session
   $ npm start
   ```

10. The application will require a login using email and a user name. This can be
    created on the Sign Up page found on the navbar.

## Using the app

### Home Page

- The main page for the user is the Home page. This contains lists of the user as well as lists of other users.

- There is a create list button for the user to create their first list. This will let the user give the list a title and comments.

- The user can also edit lists and delete lists that belong to that user using buttons found at the bottom of each list.

- The user can add podcasts to any list that they have created by going to one of the podcast resource pages.

### Search for New Podcasts

- This page can be reached by the navigation at the top of the app. It allows the user to search for podcasts using the Listen Notes API.

- The user can either use the search bar to search for any word combination or use the dropdown under genres to look at the top podcasts in any genre selection.

* After using either of these methods the user will be able to see individual podcasts and learn more about them.

* There is a expansion feature on each card for the podcast that allows the user to read the description and to visit the website of the podcast if a link was provided.

* Once the user finds a podcast they are interested in they can click a button at the bottom of the podcast named "Save Podcast". This allows the user to save the podcast information so that it can be added to any list. This also enables the "Add to a List" button.

* The user can then add the podcast to a list using that button. This will take to user to a display of the podcast to be added and the user can use a dropdown select to choose which list to add the podcast to.

### Gallery

- This link has two main features. It contains all the podcasts saved by any user of the app and allows the user to also save any of those podcasts to a list.
  The other feature is a spotlight feature that shows a random podcast episode to help inspire the user to find new podcasts.

- For the saved podcasts there is also a button on each podcasts named "Recent episodes". This allows the user to view the 10 most recent episode titles so that they can get a better feel for the topics of the podcast in general.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
