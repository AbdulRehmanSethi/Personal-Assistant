# Personality Assistant App  
This project is a **Personality Assistant** mobile application built using **React Native** and **Expo**. It integrates real-time WebSocket communication, voice recognition, and audio playback capabilities. The app serves as an interactive assistant, allowing users to send messages, make calls, and communicate using voice commands.  

## **Features**  
- Real-time WebSocket communication.  
- Voice-to-text recognition.  
- Chat interface with an assistant.  
- Audio message playback with a progress bar for audio tracking.  
- Call and microphone controls.  

## Getting Started
 Follow these steps to set up and run the project on your local machine.

## Step 1: Clone the Repository
 - git clone https://github.com/AbdulRehmanSethi/Personal-Assistant.git

## Step 2: Install Dependencies
 - npm install / yarn install

## Step 3: Start the Project
 - npx expo start

## Step 4: Launch on Android
 - Once the Expo CLI opens in your terminal or browser, press a to launch the app on an Android device or emulator.

## Usage 
  ## Start a Call:
    - Use the "Start Call" button to connect to the WebSocket server and initiate communication.

  ## Send Messages:
    - Type a message in the chat box and send it. The assistant will respond in real time.

  ## Use Voice Commands:
    - Press the microphone button to start speaking. The app will transcribe and send your speech as a message.

  ## End a Call:
    - Use the "End Call" button to disconnect from the WebSocket server and clear the chat.


## Project Structure

  ## /src/components/
    - Contains reusable UI components like:
  - **MicControls**: Microphone control buttons.
  - **CallControls**: Call start/end buttons.
  - **Header**: Displays the app's title.
  - **ProgressBar**: Displays audio progress.
  - **ChatComponent**: Handles chat messages.

## /src/screen/app/
-main app screen 

## /src/services/
- Contains service files for features like audio recognition (useAudio).

## App.tsx
- Main app file, handles the core functionality, WebSocket communication, and app lifecycle.

## Permissions
- Microphone Permission
- For Android, the app requests microphone permission for audio recording during the initial launch. Ensure you grant permission to avoid errors.

## Dependencies
- **react-native-gifted-chat**: For chat UI and message handling.
- **react-native-fs**: File system access for managing audio files.
- **react-native-track-player**: For audio playback.
- **react-native-safe-area-context**: For layout handling.
- **expo**: Framework for running the React Native project.

## Troubleshooting
  ## WebSocket not connecting:
    - Ensure the WebSocket server URL in WEBSOCKET_URL is correct and the server is running.

  ## Audio not playing:
    - Check if react-native-track-player is set up correctly. Reset the player if needed.

  ## Permission Denied:
    - Grant microphone access manually in your device settings if the prompt is skipped.

## Commands Summary
- Install dependencies: **npm install**
- Run project: **npx expo start**
- Launch on Android: **Press a in Expo CLI.**

## Future Improvements
- Support for iOS devices.
- Enhancements in UI and voice recognition.

