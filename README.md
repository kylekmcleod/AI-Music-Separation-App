# AI-Powered Music Separator
This is my personal project Song Separator. It is a web application that allows users to split any song into vocal, drum, instrument, and bass tracks. Music production inspired me to make a simple to use STEM track splitter that anyone can use.

![Song Separator Homepage](https://i.ibb.co/Mgs2gS5/Song-Seperator.jpg)

## Technologies Used

- **Node.js:** Backend server runtime
- **Express.js:** Web framework for Node.js
- **React:** Frontend library for building the user interface
- **MongoDB:** Database
- **Spleeter:** Audio separation library by Deezer

## How It Works
1. **Upload Your Audio File**: Choose the song you want to separate.
2. **AI Processing**: The AI processes the audio, which usually takes about 1 minute.
3. **Select Elements to Isolate**: Pick the components you wish to isolate (vocals, bass, drums, etc.).
4. **Download and Edit**: Once the separation is complete, download the individual stems and adjust their volumes or remix them as desired.

## Running the project
1. Clone repository to your system.
2. Make sure node.js is installed on your system. https://nodejs.org/en.
3. Download Python 3.8.8. https://www.python.org/downloads/release/python-3810/. Make sure to check "Add python to enviromental variables".
4. Install Python VSCode extentsion.
5. Install FFmpeg https://phoenixnap.com/kb/ffmpeg-windows#ftoc-heading-4.

##### Client (frontend)
1. Right click **client** folder and Open in Integrated Terminal.
2. Type ```npm install``` to install dependencies.

##### Server (backend)
1. Right click **server** folder and Open in Integrated Terminal.
2. Type ```npm install``` to install dependencies.
3. Press CTRL + SHIFT + P to locate and select "Python: Create Enviroment".
4. Select .venv.
5. Select Python 3.8.8.
6. Drag .venv folder into server directory.
7. Open powershell as administrator and type ```powershell Set-ExecutionPolicy RemoteSigned```.
8. In VSCode /server terminal, type ```.venv\Scripts\activate```.
9. Type ```python -m pip install spleeter```.
10. Replace uri variable in server/src/mongodb.js with your own MongoDB uri.
11. Replace mongoUrl variable in server/server.js with your own MongoDB uri.
12. Replace secret variable in server/server.js with your own secret key.

##### Start project
1. Right click **client** folder and Open in Integrated Terminal. Type ```npm start```.
2. Right click **server** folder and Open in Integrated Terminal. Type ```npm start```.
3. Open your web browser and navigate to http://localhost:3000.
