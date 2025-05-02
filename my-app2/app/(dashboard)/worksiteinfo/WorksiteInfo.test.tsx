import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WorksiteInfo from './page';
import '@testing-library/jest-dom';
import * as firebase from 'firebase/database';

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: {
      user: {
        name: 'Test User',
        email: 'test@example.com'
      },
      expires: '2100-01-01T00:00:00.000Z'
    },
    status: 'authenticated',
    update: vi.fn()
  }))
}));

vi.mock('firebase/database', () => ({
  ref: vi.fn((db, path) => ({ db, path, key: path?.split('/')[1] || Date.now().toString() })),
  set: vi.fn().mockResolvedValue(undefined),
  update: vi.fn().mockResolvedValue(undefined),
  get: vi.fn(),
  child: vi.fn(ref => ref),
  db: {}
}));

vi.mock('../profile/lib/firebase', () => ({
  db: {}
}));

vi.mock('./Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>
}));

describe('WorksiteInfo Component', () => {
  const mockTasks = {
    'task1': {
      address: '123 Main St',
      assignedTo: 'Test User',
      jobType: 'Plumbing',
      phoneNumber: '555-1234',
      status: 'Assigned',
      hoursWorked: 2
    },
    'task2': {
      address: '456 Oak Ave',
      assignedTo: 'Test User',
      jobType: 'Electrical',
      phoneNumber: '555-5678',
      status: 'Work In Progress',
      hoursWorked: 4
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(firebase.get).mockResolvedValue({
      exists: () => true,
      val: () => mockTasks
    } as any);

    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the worksite info page with tasks', async () => {
    render(<WorksiteInfo />);

    await waitFor(() => {
      expect(firebase.get).toHaveBeenCalled();
    });

    expect(screen.getByText('Worksite Info')).toBeInTheDocument();

    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('456 Oak Ave')).toBeInTheDocument();
  });

  it('opens dialog when clicking on a worksite', async () => {
    render(<WorksiteInfo />);

    await waitFor(() => {
      expect(firebase.get).toHaveBeenCalled();
    });

    fireEvent.click(screen.getByText('123 Main St'));
    
    expect(screen.getByText('Worksite Details')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    
    const dialogContent = screen.getByRole('dialog');
    expect(dialogContent).toHaveTextContent('Test User');
    expect(dialogContent).toHaveTextContent('555-1234');
    expect(dialogContent).toHaveTextContent('Plumbing');
    expect(dialogContent).toHaveTextContent('Assigned');
  });

  it('updates hours worked and status', async () => {
    render(<WorksiteInfo />);

    await waitFor(() => {
      expect(firebase.get).toHaveBeenCalled();
    });

    fireEvent.click(screen.getByText('123 Main St'));

    const hoursInput = screen.getByRole('spinbutton');
    fireEvent.change(hoursInput, { target: { value: '5' } });

    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'Completed' } });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(firebase.update).toHaveBeenCalledTimes(1);

      expect(firebase.update).toHaveBeenCalledWith(
        expect.anything(),
        {
          'jobs/task1/hoursWorked': 5,
          'jobs/task1/status': 'Completed'
        }
      );
    });
  });

  it('handles Firebase fetch errors gracefully', async () => {
    vi.mocked(firebase.get).mockRejectedValue(new Error('Firebase connection error'));

    render(<WorksiteInfo />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching tasks:',
        expect.any(Error)
      );
    });

    expect(screen.getByText('No worksites found.')).toBeInTheDocument();
  });

  it('displays loading state', async () => {
    vi.mocked(firebase.get).mockImplementation(() => new Promise(() => {}));
    
    render(<WorksiteInfo />);
    
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});