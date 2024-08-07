
var DataColorRaw  ;
var DataColorRipe ;
var DataColorVRipe ;
var DataHumRaw  ;
var DataHumRipe ;
var DataHumVRipe ;

var FDataColorRaw =[] ;
var FDataColorRipe =[];
var FDataColorVRipe = [];
var FDataHumRaw = [];
var FDataHumRipe = [];
var FDataHumVRipe = [];

var preDataColor1 =[];
var preDataColor2 =[];
var preDataColor3 =[];
var preDataHum1 =[];
var preDataHum2 =[];
var preDataHum3 =[];

window.onload = function () {
    ScatterData(); 
  };
async function ScatterData() {

    try {
  
      const response = await fetch('API/loginGraph.php', {});
  
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // รับข้อมูล JSON จาก response
      console.log(data);
  
        DataColorRaw = data.colorRaw.map(Number);
        DataColorRipe = data.colorRipe.map(Number);
        DataColorVRipe = data.colorVRipe.map(Number);
        DataHumRaw = data.humRaw.map(Number);
        DataHumRipe = data.humRipe.map(Number);
        DataHumVRipe = data.humVRipe.map(Number);
      
    }catch(error) {
        console.error(error);
    }
    FDataColorRaw = DataColorRaw.reduce((map, value) => {
        map[value] = (map[value] || 0) + 1;
        return map;
      }, {});
      FDataColorRaw = Object.values(FDataColorRaw).sort((a, b) => b - a);
      DataColorRaw = [...new Set(DataColorRaw)].sort((a, b) => a - b);
    
      FDataColorRipe = DataColorRipe.reduce((map, value) => {
        map[value] = (map[value] || 0) + 1;
        return map;
      }, {});
      FDataColorRipe = Object.values(FDataColorRipe).sort((a, b) => b - a);
      DataColorRipe = [...new Set(DataColorRipe)].sort((a, b) => a - b);
    
      FDataColorVRipe = DataColorVRipe.reduce((map, value) => {
        map[value] = (map[value] || 0) + 1;
        return map;
      }, {});
      FDataColorVRipe = Object.values(FDataColorVRipe).sort((a, b) => b - a);
      DataColorVRipe = [...new Set(DataColorVRipe)].sort((a, b) => a - b);
    
      preDataColor1 =[];
      for (let i = 0; i < DataColorRaw.length; i ++) {
        preDataColor1.push({ x: DataColorRaw[i], y: FDataColorRaw[i] });
      }
      preDataColor2 =[];
      for (let i = 0; i < DataColorRipe.length; i ++) {
        preDataColor2.push({ x: DataColorRipe[i], y: FDataColorRipe[i] });
      }
      preDataColor3 =[];
      for (let i = 0; i < DataColorVRipe.length; i ++) {
        preDataColor3.push({ x: DataColorVRipe[i], y: FDataColorVRipe[i] });
      }
      
      dataColor1 = {
        label: 'ดิบ',
        data: preDataColor1,
        borderColor: 'rgba(0, 191, 99,1)', // Red
        backgroundColor: 'rgba(0, 191, 99,1)',
        
        // Add more data points as needed
      };dataColor2 = {
        label: 'สุก',
        data: preDataColor2,
        borderColor: 'rgb(255, 145, 77)', // Red
        backgroundColor: 'rgb(255, 145, 77)',
        
        // Add more data points as needed
      };dataColor3 = {
        label: 'สุกมาก',
        data: preDataColor3,
        borderColor: 'rgb(255, 87, 87)', // Red
        backgroundColor: 'rgb(255, 87, 87)',
        
        // Add more data points as needed
      };
      
      FDataHumRaw = DataHumRaw.reduce((map, value) => {
        map[value] = (map[value] || 0) + 1;
        return map;
      }, {});
      FDataHumRaw = Object.values(FDataHumRaw).sort((a, b) => b - a);
      DataHumRaw = [...new Set(DataHumRaw)].sort((a, b) => a - b);
    
      FDataHumRipe = DataHumRipe.reduce((map, value) => {
        map[value] = (map[value] || 0) + 1;
        return map;
      }, {});
      FDataHumRipe = Object.values(FDataHumRipe).sort((a, b) => b - a);
      DataHumRipe = [...new Set(DataHumRipe)].sort((a, b) => a - b);
    
      FDataHumVRipe = DataHumVRipe.reduce((map, value) => {
        map[value] = (map[value] || 0) + 1;
        return map;
      }, {});
      FDataHumVRipe = Object.values(FDataHumVRipe).sort((a, b) => b - a);
      DataHumVRipe = [...new Set(DataHumVRipe)].sort((a, b) => a - b);
    
      preDataHum1 =[];
      for (let i = 0; i < DataHumRaw.length; i ++) {
        preDataHum1.push({ x: DataHumRaw[i], y: FDataHumRaw[i] });
      }
      preDataHum2 =[];
      for (let i = 0; i < DataHumRipe.length; i ++) {
        preDataHum2.push({ x: DataHumRipe[i], y: FDataHumRipe[i] });
      }
      preDataHum3 =[];
      for (let i = 0; i < DataHumVRipe.length; i ++) {
        preDataHum3.push({ x: DataHumVRipe[i], y: FDataHumVRipe[i] });
      }
      dataHum1 = {
        label: 'ดิบ',
        data: preDataHum1,
        borderColor: 'rgba(0, 191, 99,1)', 
        backgroundColor: 'rgba(0, 191, 99,1)',
      };dataHum2 = {
        label: 'สุก',
        data: preDataHum2,
        borderColor: 'rgb(255, 145, 77)',
        backgroundColor: 'rgb(255, 145, 77)',
      };dataHum3 = {
        label: 'สุกมาก',
        data: preDataHum3,
        borderColor: 'rgb(255, 87, 87)', 
        backgroundColor: 'rgb(255, 87, 87)',
      };
    
      datasetsColor = [dataColor1,dataColor2,dataColor3];
      datasetsHum = [dataHum1,dataHum2,dataHum3];
      chartData();
}
function chartData(){


    configColor = {
      type: 'scatter',
      data: {
        datasets: 
        datasetsColor
        
      },
      options: {
  
        plugins: {
          legend: {
            position: "bottom",
            labels: {
            font: {
              size: 15,
          }},
          },
          title :{
            display : true ,
            text : 'กราฟแสดงค่าสี Red ของความสุกผลปาล์มแต่ละระดับ' ,
            padding: {
              bottom: 10,
          },
          font: {
            size: 20,
        }
          }
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'ค่าสี'
          }
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'ค่าความถี่'
          }
          },
        },
      },
    };
  
    configHum = {
      type: 'scatter',
      data: {
        datasets: 
        datasetsHum
        
      },
      options: {
  
        plugins: {
          legend: {
            position: "bottom",
            labels: {
            font: {
              size: 15,
          }},
          },
          title :{
            display : true ,
            text : 'กราฟแสดงค่าความชื้นของความสุกผลปาล์มแต่ละระดับ' ,
            padding: {
              bottom: 10,
          },
          font: {
            size: 20,
        }
          }
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'ค่าความชื้น'
          }
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'ค่าความถี่'
          }
          },
        },
      },
    };
    showchart();
  }
    function showchart() {
      const ctxColor = document.getElementById('scatterChartColor');
      const ctxHum = document.getElementById('scatterChartHum');
  
      let chartScatterColor = Chart.getChart(ctxColor);
      let chartScatterHum = Chart.getChart(ctxHum);
  
      if (chartScatterColor) {
        chartScatterColor.destroy(); 
      }
      if(chartScatterHum){
        chartScatterHum.destroy(); 
      }
  
      chartScatterColor = new Chart(ctxColor, configColor); 
      chartScatterHum = new Chart(ctxHum, configHum); 
    }  