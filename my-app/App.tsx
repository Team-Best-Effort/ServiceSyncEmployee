import React from 'react';
import EmployeeWorksiteInformation from './pages/EmployeeWorksiteInformation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeHome from './pages/EmployeeHome';
import EmployeeInfo from './pages/EmployeeInfo';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv2-2kRLd0WgSDWZy8FHCZ_tV0C8-qZmk",
  authDomain: "fir-for-mobile.firebaseapp.com",
  projectId: "fir-for-mobile",
  storageBucket: "fir-for-mobile.firebasestorage.app",
  messagingSenderId: "439213772497",
  appId: "1:439213772497:web:dbd8c4b890020cf30bfff0",
  measurementId: "G-V01HZ2PJHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const App: React.FC = () => {
 
  const Stack = createStackNavigator();


  return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="EmployeeHome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="EmployeeHome" component={EmployeeHome} />
          <Stack.Screen name="EmployeeInfo" component={EmployeeInfo} />
          <Stack.Screen name="EmployeeWorksiteInformation" component={EmployeeWorksiteInformation} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;