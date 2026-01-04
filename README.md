# Task Manager App - React Native

A simple and elegant Task Manager mobile application built with React Native that allows users to add, view, and manage their tasks efficiently.

## Features

✅ **Add Tasks** - Create new tasks using an intuitive input field  
✅ **View Tasks** - Display all tasks in a scrollable list using FlatList  
✅ **Mark as Completed** - Toggle task completion status with a tap  
✅ **Delete Tasks** - Remove tasks you no longer need  
✅ **Clean UI** - Modern, minimalist design with smooth animations  
✅ **Task Counter** - Shows pending tasks count in the header  
✅ **Persistent State** - Tasks remain during the app session  

## Technologies Used

- **React Native** - Cross-platform mobile framework
- **React Hooks** - useState for state management
- **FlatList** - Efficient list rendering
- **Functional Components** - Modern React approach

## Screenshots

The app features:
- A purple-themed header with task count
- Input field with a circular add button
- Clean task cards with checkboxes
- Strike-through text for completed tasks
- Delete buttons for each task
- Empty state when no tasks exist

## Prerequisites

Before running this app, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI** - Install with: `npm install -g react-native-cli`
- **Android Studio** (for Android development)
  - Android SDK
  - Android Virtual Device (AVD) or physical device
- **Xcode** (for iOS development, macOS only)
  - iOS Simulator or physical device
- **JDK 17** (for Android)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd task-manager-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

## Running the App

### Android

1. **Start Metro Bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on Android** (in a new terminal)
   ```bash
   npm run android
   # or
   yarn android
   ```

   Make sure you have:
   - An Android emulator running, OR
   - A physical Android device connected via USB with USB debugging enabled

### iOS (macOS only)

1. **Start Metro Bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on iOS** (in a new terminal)
   ```bash
   npm run ios
   # or
   yarn ios
   ```

   This will launch the iOS Simulator automatically.

## Building APK for Android

### Debug APK

1. Navigate to the android directory:
   ```bash
   cd android
   ```

2. Build the APK:
   ```bash
   ./gradlew assembleDebug
   ```

3. Find the APK at:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Release APK (Production)

1. **Generate a signing key**
   ```bash
   cd android/app
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure gradle.properties** (android/gradle.properties)
   ```properties
   MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=my-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=*****
   MYAPP_RELEASE_KEY_PASSWORD=*****
   ```

3. **Update build.gradle** (android/app/build.gradle)
   ```gradle
   android {
       ...
       signingConfigs {
           release {
               if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                   storeFile file(MYAPP_RELEASE_STORE_FILE)
                   storePassword MYAPP_RELEASE_STORE_PASSWORD
                   keyAlias MYAPP_RELEASE_KEY_ALIAS
                   keyPassword MYAPP_RELEASE_KEY_PASSWORD
               }
           }
       }
       buildTypes {
           release {
               ...
               signingConfig signingConfigs.release
           }
       }
   }
   ```

4. **Build the release APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

5. **Find the APK at:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

## Project Structure

```
task-manager-app/
├── App.js                 # Main application component
├── index.js              # Entry point
├── app.json              # App configuration
├── package.json          # Dependencies
├── babel.config.js       # Babel configuration
├── metro.config.js       # Metro bundler configuration
├── android/              # Android native code
├── ios/                  # iOS native code
└── README.md            # This file
```

## Code Overview

### App.js

The main component includes:

- **State Management**
  - `task`: Current input text
  - `tasks`: Array of task objects with id, text, and completed status

- **Key Functions**
  - `addTask()`: Adds a new task to the list
  - `toggleTask(id)`: Toggles completion status
  - `deleteTask(id)`: Removes a task from the list

- **Components**
  - Header with title and task counter
  - Input field with add button
  - FlatList for displaying tasks
  - Custom task item renderer
  - Empty state view

## Customization

You can customize the app by modifying:

- **Colors**: Change the purple theme (`#6C63FF`) in the StyleSheet
- **Task Properties**: Add new fields like priority, due date, etc.
- **Persistence**: Implement AsyncStorage to save tasks permanently
- **Additional Features**: Categories, search, filters, etc.

## Troubleshooting

### Common Issues

1. **Metro bundler not starting**
   - Clear cache: `npm start -- --reset-cache`

2. **Build errors**
   - Clean builds: `cd android && ./gradlew clean`
   - Delete node_modules: `rm -rf node_modules && npm install`

3. **iOS pod errors**
   - Clean pods: `cd ios && pod deintegrate && pod install`

4. **Android emulator not detected**
   - Check ADB: `adb devices`
   - Restart ADB: `adb kill-server && adb start-server`

## CI/CD Pipeline

This project includes a GitHub Actions workflow that automatically builds and releases the APK when you push to the repository.

### How It Works

1. **Triggers**: Runs on every push to `main` or `master` branch
2. **Build Process**: 
   - Sets up Node.js 18 and JDK 17
   - Installs npm dependencies
   - Builds Android debug APK using Gradle
3. **Automatic Release**:
   - Creates a new GitHub release with version number
   - Uploads the APK as a release asset
   - Includes commit message and build details

### Accessing Releases

After pushing your code:
1. Go to your GitHub repository
2. Click on "Releases" in the right sidebar
3. Download the latest APK file (e.g., `TaskManager-v1.0.X.apk`)

### Workflow File

The workflow is defined in `.github/workflows/android-build.yml` and runs automatically on every push.

### Manual Trigger (Optional)

You can also manually trigger the workflow from the Actions tab in your GitHub repository.

## Future Enhancements

- 🔄 Data persistence using AsyncStorage
- 📅 Due dates for tasks
- 🎨 Task categories and colors
- 🔍 Search and filter functionality
- 📊 Statistics and progress tracking
- 🌙 Dark mode support
- 🔔 Local notifications for reminders
- 🔐 Production APK signing in CI/CD

## License

This project is open source and available under the MIT License.

## Author

Created as an assignment project for demonstrating React Native skills.

## Support

For issues and questions, please open an issue in the GitHub repository.

---

**Happy Task Managing! 📝✨**
