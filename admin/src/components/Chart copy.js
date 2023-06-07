import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'
import axios from 'axios';

const res = await axios.get('http://localhost:5001/api/products/admin/all/Productss');
console.log('produc', res.data);

// caculate product by month
const productByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const data = res.data;
  data.data.map((product) => {
    let month = new Date(product.createdAt).getMonth();
    productByMonth[month] += 1;
  })

console.log('productByMonth', productByMonth);
const LineChartC = () => {
  useEffect(() => {
    // Tạo biểu đồ
    const ctx = document.getElementById('performaneLine2').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"], // X-axis
        datasets: [
          {
            label: 'Product number by month',
            data: productByMonth, // Dữ liệu biểu đồ
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
      <canvas id="performaneLine2" />
    </div>
  );
};

export default LineChartC;
