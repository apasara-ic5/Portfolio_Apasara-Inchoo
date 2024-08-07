var palmLevel;
var palmCount ;
var barColors = ["#ff0000", "#00ff00", "#0000ff"];


function PrepareDataplam(){
 

  BarData();

 }

 async function BarData() {

    try {

  
      const response = await fetch('API/palm.php', {
          method: 'POST'

      });
  
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // รับข้อมูล JSON จาก response
      console.log(data);
      palmLevel = data.level;
      palmCount = data.countPalm.map(Number);
      console.log(palmLevel);
     
        palmLevel[0] = "ดิบ";
     
        palmLevel[1] = "สุก";
      
        palmLevel[2] = "สุกมาก";
      
      
      
  } catch (error) {
      console.error(error);
  }
  Barchart();
  
}

function Barchart(){
    const labels = palmLevel;
    const data = {
        labels : palmLevel,
        datasets: [{
            
            backgroundColor: 
            [ 'rgba(0, 191, 99,1)',
            'rgb(102, 102, 255)',
            'rgb(255, 87, 87)'
        ],
           data: [palmCount[0] ,palmCount[1],palmCount[2]]
        }]
    };
    
configBar = {
    type: "bar",
    data: data,
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
        tooltip: {display: false},
        scales: {
            x :{
              beginAtZero: true,
              
              title: {
                display: true,
                text: 'ระดับความสุก'
            }
            },
            y: {
              beginAtZero: true,
              
              title: {
                display: true,
                text: 'จำนวนปาล์ม'
            }
            },
          }
    },
  };

    showBarchart();
  }
    function showBarchart() {
      const ctxBar = document.getElementById('BarChart');
  
      let chart = Chart.getChart(ctxBar);
  
      if (chart) {
        chart.destroy(); 
      }
      chart = new Chart(ctxBar, configBar); 
    }