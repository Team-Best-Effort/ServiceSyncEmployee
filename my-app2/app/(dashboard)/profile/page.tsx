import React from 'react';

interface Employee {
  name: string;
  phoneNumber: string;
  email: string;
}

interface EmployeeInfoProps {
  navigation: any;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ navigation }) => {
  const employee: Employee = {
    name: 'Guest User',
    phoneNumber: 'No phone number provided',
    email: 'No email provided',
  };

  return (
    <div style={styles.container} data-testid="employee-info-screen">
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Employee Info</h1>
      </div>

      <div style={styles.profileSection}>
        <div style={styles.avatarContainer}>
        </div>
        <h2 style={styles.employeeName}>{employee.name}</h2>
      </div>

      <div style={styles.infoCard}>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Phone Number</span>
          <span style={styles.infoValue}>{employee.phoneNumber}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Email Address</span>
          <span style={styles.infoValue}>{employee.email}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    backgroundColor: 'white',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold' as 'bold',
    margin: 0,
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    margin: '15px 0',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  employeeName: {
    color: 'black',
    fontSize: 24,
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: 10,
    padding: 15,
    margin: '0 16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  infoRow: {
    marginBottom: 10,
  },
  infoLabel: {
    color: '#555',
    fontSize: 14,
    display: 'block',
  },
  infoValue: {
    color: 'black',
    fontSize: 16,
  },
};
export default EmployeeInfo;
