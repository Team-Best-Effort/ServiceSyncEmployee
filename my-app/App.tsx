import React from 'react';
import EmployeeWorksiteInformation from './pages/EmployeeWorksiteInformation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeHome from './pages/EmployeeHome';
import EmployeeInfo from './pages/EmployeeInfo';

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