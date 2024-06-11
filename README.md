# AI-Powered Music Separator
This is my personal project Song Seperator. It is a web application that allows users to split any song into vocal, drum, instrument, and bass tracks. Music production inspired me to make a simple to use STEM track splitter that anyone can use.

![Song Seperator Homepage](https://i.ibb.co/Mgs2gS5/Song-Seperator.jpg)

## Technologies Used

- **Node.js:** Backend server runtime
- **Express.js:** Web framework for Node.js
- **React:** Frontend library for building the user interface
- **Spleeter:** Audio separation library by Deezer

## How It Works
1. **Upload Your Audio File**: Choose the song you want to separate.
2. **AI Processing**: The AI processes the audio, which usually takes about 1 minute.
3. **Select Elements to Isolate**: Pick the components you wish to isolate (vocals, bass, drums, etc.).
4. **Download and Edit**: Once the separation is complete, download the individual stems and adjust their volumes or remix them as desired.

## Running the project
1. Make sure node.js is installed on your system. https://nodejs.org/en
2. Right click **client** folder and Open in Integrated Terminal. Type ```npm install``` to install dependencies.
3. Right click **server** folder and Open in Integrated Terminal. Type ```npm install``` to install dependencies.
4. Right click **client** folder and Open in Integrated Terminal. Type ```npm start```.
5. Right click **server** folder and Open in Integrated Terminal. Type ```npm start```.
6. Open your web browser and navigate to http://localhost:3000.
