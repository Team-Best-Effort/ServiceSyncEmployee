import React from 'react';
import EmployeeWorksiteInformation from './pages/EmployeeWorksiteInformation';

const App: React.FC = () => {
  const worksiteData = {
    address: {
      street: '1234 Example Street',
      city: 'Vacaville',
      state: 'CA',
      zipCode: '94533',
    },
    tasks: [
      { id: 1, title: 'Install new equipment' },
      { id: 2, title: 'Test system functionality' },
      { id: 3, title: 'Document installation' },
    ],
    deadline: 'December 31, 2024',
  };

  const handleGetDirections = () => {
    console.log('getting directions');
  };

  const handleClockIn = () => {
    console.log('clocking in');
  };

  return (
    <EmployeeWorksiteInformation
      address={worksiteData.address}
      tasks={worksiteData.tasks}
      deadline={worksiteData.deadline}
      onGetDirections={handleGetDirections}
      onClockIn={handleClockIn}
    />
  );
};

export default App;