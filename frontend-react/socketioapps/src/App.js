// import module
import './App.css';
import { useState, useEffect } from 'react'
import SocketIOClient from 'socket.io-client'
import Chart from 'chart.js/auto'

function App() {
  const [data, setData] = useState([])
  const [chart, setChart] = useState(null)

  const handleClick = () => {
    const socket = SocketIOClient("http://localhost:3050")
    socket.on("message", (data) => {
      setData(data)
    })
  }
  const createChart = () => {
    document.querySelector('#chartbox').remove()
    document.querySelector('.chart').innerHTML = `<canvas id="chartbox" width="auto"></canvas>`
    const myChart = new Chart(document.querySelector('#chartbox'), {
      type: 'line',
      data: {
        labels: data.map(it => 'Day'),
        datasets: [
          {
            label: 'Val',
            data,
            tension: 0.3,
            borderColor: 'rgb(26, 95, 122)',
            backgroundColor: 'rgba(26, 95, 122, 0.3)',
            borderWidth: 3,
            fill: true,
            pointBorderWidth: 3,
            pointRadius: 5,
            pointBorderColor: '#fff',
            pointBackgroundColor: 'rgb(26, 95, 122)'
          }
        ]
      },
      options: {
        responsive: true
      }
    })  
    setChart(myChart)
  }

  useEffect(() => {
    createChart()
  }, [])

  useEffect(() => {
    if(chart){
      chart.config.data.labels = data.map(it => 'Day')
      chart.config.data.datasets[0].data = data
      chart.update()
    } 
  }, [data, chart])
  return (
    <div className="App">
      <div style={{width: '80%', margin: '5em 0 5em 10%'}}>
        <div className="chart">
          <canvas id="chartbox" width="auto"></canvas>
        </div>
        <button onClick={handleClick}>Start</button>
      </div>
    </div>
  );
}

export default App;
