// __tests__/Navigation.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';

describe('App Navigation', () => {
  it('renders EmployeeHome screen initially', async () => {
    const { getByTestId, getByText } = render(<App />);
    await waitFor(() => {
      expect(getByTestId('employee-home-screen')).toBeTruthy();
      expect(getByText('Welcome to Employee Home')).toBeTruthy();
    });
  });

  it('navigates to EmployeeWorksiteInformation when worksite nav button is pressed', async () => {
    const { getByText, getByTestId } = render(<App />);
    const worksiteButton = getByText('💼');
    fireEvent.press(worksiteButton);
    await waitFor(() => {
      expect(getByTestId('employee-worksite-screen')).toBeTruthy();
    });
  });

  it('navigates to EmployeeInfo when employee info nav button is pressed', async () => {
    const { getByText, getByTestId } = render(<App />);
    const employeeInfoButton = getByText('👤');
    fireEvent.press(employeeInfoButton);
    await waitFor(() => {
      expect(getByTestId('employee-info-screen')).toBeTruthy();
    });
  });

  it('navigates to EmployeeHome when home nav button is pressed', async () => {
    const { getByText, getByTestId } = render(<App />);
    fireEvent.press(getByText('👤'));
    await waitFor(() => {
      expect(getByTestId('employee-info-screen')).toBeTruthy();
    });
    fireEvent.press(getByText('🏠'));
    await waitFor(() => {
      expect(getByTestId('employee-home-screen')).toBeTruthy();
    });
  });
});
