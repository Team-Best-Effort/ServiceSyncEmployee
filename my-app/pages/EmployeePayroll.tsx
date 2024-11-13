import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const EmployeePayrollScreen = () => {
  const [tracking, setTracking] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);

  const handleStartTracking = () => {
    const currentTime = new Date().toISOString().split('T')[1].split('.')[0] + "-08:00";
    setStartTime(currentTime);
    setTracking(true);
    Alert.alert('Tracking Started', 'Payroll tracking has started.');
  };
 
  //Function to retrieve and refresh the access token.
  const getAccessToken = async () => {
    try {
      // Check if token is expired or not present
      if (!accessToken || tokenExpired()) {
        const response = await axios.post('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
          grant_type: 'refresh_token',
          refresh_token: '<your_refresh_token>',
          client_id: '<your_client_id>',
          client_secret: '<your_client_secret>',
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        });

        const newAccessToken = response.data.access_token;
        setAccessToken(newAccessToken);
        
        // Set token expiration to 60 minutes from now
        const expiresIn = 60 * 60 * 1000;
        setTokenExpiration(Date.now() + expiresIn);

        return newAccessToken;
      }

      return accessToken;
    } catch (error) {
      console.error('Error refreshing token', error);
      Alert.alert('Error', 'Unable to refresh access token.');
      return null;
    }
  };


  const tokenExpired = async () => {
    //Logic for checking if token is expired.
  }
    
  }

  const handleEndTracking = async () => {
    if (!startTime) return;

    const endTime = new Date().toISOString().split('T')[1].split('.')[0] + "-08:00";

    try {
      const response = await axios.post(
        'https://sandbox-quickbooks.api.intuit.com/v3/company/9341453440531350/timeactivity?minorversion=73',
        {
          TxnDate: new Date().toISOString().split('T')[0],
          StartTime: startTime,
          EndTime: endTime,
          EmployeeRef: {
            name: "Emily Platt",
            value: "55"
          },
          NameOf: "Employee"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer <access token>`
          }
        }
      );
      Alert.alert('Tracking Ended', 'Payroll tracking has been successfully ended.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an error ending the payroll tracking.');
    }
    setTracking(false);
    setStartTime(null);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Start Tracking"
        onPress={handleStartTracking}
        disabled={tracking}
      />
      <Button
        title="End Tracking"
        onPress={handleEndTracking}
        disabled={!tracking}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  }
});

export default EmployeePayrollScreen;
