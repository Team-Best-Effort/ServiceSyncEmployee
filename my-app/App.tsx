import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import EmployeeHome from './pages/EmployeeHome';
import EmployeeInfo from './pages/EmployeeInfo';
import EmployeeWorksiteInformation from './pages/EmployeeWorksiteInformation';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeSignUp from './pages/EmployeeSignUp';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EmployeeHome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="EmployeeHome" component={EmployeeHome} />
        <Stack.Screen name="EmployeeInfo" component={EmployeeInfo} />
        <Stack.Screen name="EmployeeWorksiteInformation" component={EmployeeWorksiteInformation} />
        <Stack.Screen name="EmployeeLogin" component={EmployeeLogin} />
        <Stack.Screen name="EmployeeSignUp" component={EmployeeSignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
