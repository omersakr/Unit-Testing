import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

global.fetch = jest.fn();

describe('UserList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Loading State
  test('displays loading state initially', () => {
    fetch.mockImplementation(() => new Promise(() => {}));

    render(<UserList />);

    const loadingElement = screen.getByTestId('loading');
    expect(loadingElement).toBeInTheDocument();
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  // Test 2: Data State
  test('displays user list when data is loaded successfully', async () => {
    const mockUsers = [
      { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com' },
      { id: 2, name: 'Sara Mohamed', email: 'sara@example.com' },
      { id: 3, name: 'Omar Hassan', email: 'omar@example.com' }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

  
    const userList = screen.getByTestId('user-list');
    expect(userList).toBeInTheDocument();
    expect(screen.getByText('Users (3)')).toBeInTheDocument();
    expect(screen.getByText('Ahmed Ali')).toBeInTheDocument();
    expect(screen.getByText('Sara Mohamed')).toBeInTheDocument();
    expect(screen.getByText('Omar Hassan')).toBeInTheDocument();
    expect(screen.getByText(/ahmed@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/sara@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/omar@example.com/)).toBeInTheDocument();
  });

  // Test 3: Empty Data State
  test('displays empty state when no users are returned', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    const emptyElement = screen.getByTestId('empty');
    expect(emptyElement).toBeInTheDocument();
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  // Test 4: Error State
  test('displays error state when fetch fails', async () => {
    const errorMessage = 'Network error';
    fetch.mockRejectedValueOnce(new Error(errorMessage));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    const errorElement = screen.getByTestId('error');
    expect(errorElement).toBeInTheDocument();
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  // Test 5: Error State
  test('displays error state when HTTP response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    const errorElement = screen.getByTestId('error');
    expect(errorElement).toBeInTheDocument();
    expect(screen.getByText(/HTTP error! status: 404/)).toBeInTheDocument();
  });

  // Test 6: Custom API URL
  test('uses custom API URL when provided', async () => {
    const customUrl = 'https://api.example.com/users';
    const mockUsers = [{ id: 1, name: 'Test User', email: 'test@example.com' }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    render(<UserList apiUrl={customUrl} />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(customUrl);
    });
  });

  // Test 7:fetch on mount
  test('calls fetch API on component mount', () => {
    fetch.mockImplementation(() => new Promise(() => {}));

    render(<UserList />);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  // Test 8:number of users
  test('renders correct number of user items', async () => {
    const mockUsers = [
      { id: 1, name: 'User 1', email: 'user1@example.com' },
      { id: 2, name: 'User 2', email: 'user2@example.com' },
      { id: 3, name: 'User 3', email: 'user3@example.com' },
      { id: 4, name: 'User 4', email: 'user4@example.com' },
      { id: 5, name: 'User 5', email: 'user5@example.com' }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Check all users
    mockUsers.forEach(user => {
      expect(screen.getByTestId(`user-${user.id}`)).toBeInTheDocument();
    });
  });
});
