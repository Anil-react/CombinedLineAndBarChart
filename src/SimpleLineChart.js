import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Paper, Typography, Select, MenuItem } from '@mui/material';

const initialPatientId = 'P001';

const userData = {
  P001: [
    { date: '2023-01-01', data1: 3, data2: 2 },
    { date: '2023-02-01', data1: 2, data2: 1 },
    { date: '2023-03-01', data1: 3, data2: 2 },
    { date: '2023-04-01', data1: 1, data2: 3 },
  ],
  P002: [
    { date: '2023-01-01', data1: 1, data2: 3 },
    { date: '2023-02-01', data1: 2, data2: 2 },
    { date: '2023-03-01', data1: 1, data2: 1 },
    { date: '2023-04-01', data1: 3, data2: 3 },
  ],
  P003: [
    { date: '2023-01-01', data1: 2, data2: 1 },
    { date: '2023-02-01', data1: 1, data2: 2 },
    { date: '2023-03-01', data1: 3, data2: 3 },
    { date: '2023-04-01', data1: 2, data2: 2 },
  ],
};

const SimpleChart = () => {
  const [selectedPatientId, setSelectedPatientId] = useState(initialPatientId);
  const [selectedInterval, setSelectedInterval] = useState('monthly');
  const [selectedView, setSelectedView] = useState('category1');

  const handlePatientChange = (event) => {
    setSelectedPatientId(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };

  const selectedUserData = userData[selectedPatientId];

  const groupedData = selectedUserData.reduce((acc, data) => {
    const date = new Date(data.date);
    const key =
      selectedInterval === 'weekly'
        ? `${date.getFullYear()}-${date.getMonth()}-${
            date.getDate() - date.getDay()
          }`
        : selectedInterval === 'monthly'
        ? `${date.getFullYear()}-${date.getMonth()}`
        : `${date.getFullYear()}-${Math.floor(date.getMonth() / 6)}`;

    if (!acc[key]) {
      acc[key] = { date: key };
    }

    Object.keys(data).forEach((category1) => {
      if (category1 !== 'date') {
        acc[key][category1] = (acc[key][category1] || 0) + data[category1];
      }
    });

    return acc;
  }, {});

  const groupedChartData = Object.values(groupedData);

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6">Simple Chart</Typography>
      <Select value={selectedPatientId} onChange={handlePatientChange}>
        <MenuItem value="P001">User 1</MenuItem>
        <MenuItem value="P002">User 2</MenuItem>
        <MenuItem value="P003">User 3</MenuItem>
      </Select>
      <Select value={selectedInterval} onChange={handleIntervalChange}>
        <MenuItem value="weekly">Weekly</MenuItem>
        <MenuItem value="monthly">Monthly</MenuItem>
        <MenuItem value="halfYearly">Half-Yearly</MenuItem>
      </Select>
      <Select value={selectedView} onChange={handleViewChange}>
        <MenuItem value="category1">Category 1 Wise</MenuItem>
        <MenuItem value="category2">Category 2 Wise</MenuItem>
      </Select>
      {groupedChartData && (
        <>
          {selectedView === 'category1' && (
            <LineChart width={600} height={300} data={groupedChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" type="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(groupedChartData[0]).map((category1) => {
                if (category1 !== 'date') {
                  return (
                    <Line
                      key={category1}
                      type="monotone"
                      dataKey={category1}
                      stroke="#8884d8"
                      name={category1}
                    />
                  );
                }
                return null;
              })}
            </LineChart>
          )}
          {selectedView === 'category2' && (
            <BarChart width={600} height={300} data={groupedChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" type="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(groupedChartData[0]).map((category1) => {
                if (category1 !== 'date') {
                  return (
                    <Bar
                      key={category1}
                      dataKey={category1}
                      fill="#82ca9d"
                      name={`Category 2 for ${category1}`}
                    />
                  );
                }
                return null;
              })}
            </BarChart>
          )}
        </>
      )}
    </Paper>
  );
};

export default SimpleChart;
