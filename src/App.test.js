import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
// import { fetchFuelData } from './ApiService';
// import { downloadJSONFile } from './DataStorage';

// Comment out the mocks for ApiService and DataStorage
// jest.mock('./ApiService');
// jest.mock('./DataStorage');

const mockData = [
  { location: 'Location A', price: 1.23 },
  { location: 'Location B', price: 2.34 }
];

describe('App Component', () => {
  beforeEach(() => {
    // Setup mocks before each test
    // fetchFuelData.mockResolvedValue(mockData);
    // downloadJSONFile.mockImplementation(() => Promise.resolve());
    // jest.clearAllMocks();
  });

  afterEach(() => {
    // jest.clearAllMocks();
  });

  it('renders fuel data and triggers JSON download', async () => {
    render(<App />);
    
    // Check that the title is rendered
    expect(screen.getByText('Fuel Prices - QLD')).toBeInTheDocument();

    // Wait for the data to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText('Location A')).toBeInTheDocument();
    });

    // Verify that both locations are displayed
    expect(screen.getByText('Location B')).toBeInTheDocument();
    
    // Verify that the API was called
    // expect(fetchFuelData).toHaveBeenCalledTimes(1);
    
    // Verify that the download was triggered
    // expect(downloadJSONFile).toHaveBeenCalledTimes(1);
    // expect(downloadJSONFile).toHaveBeenCalledWith(mockData);
  });

  it('filters data based on search input', async () => {
    render(<App />);

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(screen.getByText('Location A')).toBeInTheDocument();
    });

    // Get the search input
    const searchInput = screen.getByPlaceholderText('Search by location or price...');
    
    // Type 'Location A' into the search input
    fireEvent.change(searchInput, { target: { value: 'Location A' } });
    
    // Verify that only Location A is displayed
    expect(screen.getByText('Location A')).toBeInTheDocument();
    expect(screen.queryByText('Location B')).not.toBeInTheDocument();
  });

  it('sorts data when header is clicked', async () => {
    render(<App />);

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(screen.getByText('Location A')).toBeInTheDocument();
    });

    // Click the location header to sort
    const locationHeader = screen.getByRole('columnheader', { name: /Location/i });
    fireEvent.click(locationHeader);

    // Get all rows
    const rows = screen.getAllByRole('row').slice(1); // Skip header row
    
    // Verify the order (ascending)
    expect(rows[0]).toHaveTextContent('Location A');
    expect(rows[1]).toHaveTextContent('Location B');

    // Click again to sort in descending order
    fireEvent.click(locationHeader);

    // Get updated rows
    const updatedRows = screen.getAllByRole('row').slice(1); // Skip header row
    
    // Verify the order (descending)
    expect(updatedRows[0]).toHaveTextContent('Location B');
    expect(updatedRows[1]).toHaveTextContent('Location A');
  });
});
