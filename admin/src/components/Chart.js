import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'
import axios from 'axios';

const res = await axios.get('http://localhost:5001/api/users/allUsers/users');
console.log(res.data);

// caculate user by month
let userByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const data = res.data;
data.data.map((user) => {
  let month = new Date(user.createdAt).getMonth();
  userByMonth[month] += 1;
})
console.log(userByMonth);
const LineChart = () => {
  useEffect(() => {
    // Tạo biểu đồ
    const ctx = document.getElementById('performaneLine').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"], // X-axis
        datasets: [
          {
            label: 'User number by month',
            data: userByMonth, // Dữ liệu biểu đồ
            borderColor: 'rgba(0, 123, 255, 1)', // Màu viền
            backgroundColor: 'rgba(0, 123, 255, 0.1)', // Màu nền
            fill: true // Đổ màu trong biểu đồ
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
  }, []);

  return (
    <div className="chartjs-wrapper mt-5">
      <canvas id="performaneLine" />
    </div>
  );
};

export default LineChart;
