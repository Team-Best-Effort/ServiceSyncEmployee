import React from 'react';
import EmployeeInfo from './pages/EmployeeInfo';

const App: React.FC = () => {
  const employeeData = {
    name: 'Employee Name',
    phoneNumber: '(123) 456 - 7890',
    email: 'Email@email.com',
  };

  const handleBackPress = () => {
    console.log('Back button pressed');
  };

  return <EmployeeInfo employee={employeeData} onBackPress={handleBackPress} />;
};

export default App;