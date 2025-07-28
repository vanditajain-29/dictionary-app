# Dictionary App

A simple and interactive dictionary application built with React, allowing users to search for word definitions, view a word of the day, and keep track of their search history.

**Features**

_Word Search:_ Instantly get definitions for any English word.

_Word of the Day (WOTD):_ Discover a new word and its definition daily.

_Search History:_ Easily revisit previously searched words with a clickable history list.

_Responsive Design:_ Optimized for various screen sizes.

_Loading Indicator:_ Provides feedback while fetching definitions.

_Error Handling:_ Displays user-friendly messages for invalid words or API issues.


**Technologies Used**

_React:_ A JavaScript library for building user interfaces.

_HTML:_ For structuring the web content.

_CSS:_ For styling and layout (inline styles and basic App.css as provided in the original code, though a full Tailwind implementation would be more robust).

_Dictionary API:_ https://api.dictionaryapi.dev/ for _word definitions_.

_Random Word API:_ https://random-word-api.herokuapp.com/ for the _Word of the Day feature_.

**Setup and Installation**
Follow these steps to get the project up and running on your local machine.

Prerequisites
Make sure you have the following installed:

Node.js: https://nodejs.org/ (includes npm)

npm (Node Package Manager) or Yarn

Steps
Clone the repository (or copy the code):
If you have a Git repository, clone it:

git clone <your-repository-url>
cd <your-project-folder>

If you just have the code, create a new React app and replace the src/App.js and src/App.css files with the provided code.

npx create-react-app dictionary-app
cd dictionary-app
# Replace src/App.js and src/App.css with the provided code

Install dependencies:
Navigate to the project directory and install the necessary packages:

npm install
# or
yarn install

Start the development server:
Once the dependencies are installed, you can start the application:

npm start
# or
yarn start

The application will typically open in your browser at http://localhost:3000.

Usage
Search for a word: Type a word into the input field and either press Enter or click the "Search" button.

View Word of the Day: The "Word of the Day" banner will appear at the top. Click on the word to see its definition. You can close the banner by clicking the '×' button.

Access Search History: Your most recent searches will appear as clickable tags at the bottom of the page. Click on any tag to quickly re-fetch its definition.

API Used
This application utilizes two external APIs:

Dictionary API: Provides comprehensive definitions, part of speech, and other linguistic information.

Random Word API: Used to fetch a random word for the "Word of the Day" feature.

Future Enhancements
Pronunciation: Add audio pronunciation for words.

Examples: Include example sentences for definitions.

Synonyms/Antonyms: Display related words.

Theming: Allow users to switch between light/dark modes.

More Robust Styling: Implement a CSS framework like Tailwind CSS for better styling and responsiveness.

License
This project is open-source and available under the MIT License.
