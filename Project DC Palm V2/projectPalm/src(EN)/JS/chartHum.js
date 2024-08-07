var levelHum ="All";
var DataHumRaw ;
var DataHumRipe ;
var DataHumVRipe ;
var countHumRipe = 1;
var countHumRaw = 1;
var countHumVRipe = 1;

var maxValueHum ;
var minValueHum ;
var allValuesHum =[];

function dropdownLevelHum(levelSelectorHum) {
    var item = document.getElementById(levelSelectorHum);
    var dropdown = document.getElementById('dropdownMenuButtonLevelHum');
    var dropdownItems  = document.getElementById('levelSelectHum').getElementsByClassName('dropdown-item');
    for (var i = 0; i < dropdownItems.length; i++) {
    dropdownItems[i].classList.remove('disabled');
    }
    var truncatedText = levelSelectorHum.slice(0, -1);
    dropdown.innerText = truncatedText;
    item.classList.add('disabled');
    levelHum = truncatedText;
    levelHum = levelHum.toLowerCase();
    event.preventDefault();
    PrepareDataHum();
   }

   window.onload = function () {
    PrepareData();
    PrepareDataHum();
    PrepareDataplam();
  };
  function PrepareDataHum(){
 
     countHumRipe = 1;
     countHumRaw = 1;
     countHumVRipe = 1;

      maxValueHum = 0;
      minValueHum = 0;
      allValuesHum =[];
    console.log(levelHum);
  
   ScatterDataHum(levelHum);
  }
  async function ScatterDataHum(level) {

    var dataToSend = {
      level: level
    };
    try {
      const formData = new FormData(); // สร้างออบเจ็กต์ FormData// เพิ่มค่า color เข้าไปใน FormData
      formData.append('level', level); // เพิ่มค่า level เข้าไปใน FormData
  
      const response = await fetch('API/humSelect.php', {
          method: 'POST',
          body: formData
      });
  
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // รับข้อมูล JSON จาก response
      console.log(data);
  
      if(levelHum == "All" || levelHum == "all"){
        
        DataHumRaw = data.humRaw.map(Number);
        DataHumRipe = data.humRipe.map(Number);
        DataHumVRipe = data.humVRipe.map(Number);
        allValuesHum = [...DataHumRaw, ...DataHumRipe, ...DataHumVRipe];

        maxValueHum = Math.max(...allValuesHum);
        minValueHum = Math.min(...allValuesHum);
      
      }else if(levelHum == "raw"){
        DataHumRaw = data.humRaw.map(Number);
        maxValueHum = Math.max(...DataHumRaw);
        minValueHum = Math.min(...DataHumRaw);
      }else if(levelHum == "ripe"){
        DataHumRipe = data.humRipe.map(Number);
        maxValueHum = Math.max(...DataHumRipe);
        minValueHum = Math.min(...DataHumRipe);
      }else if(levelHum == "very ripe"){
        DataHumVRipe = data.humVRipe.map(Number);
        maxValueHum = Math.max(...DataHumVRipe);
        minValueHum = Math.min(...DataHumVRipe);
      }
      
  } catch (error) {
      console.error(error);
  }
  
  
  if(level == "All" || level == "all"){

    preDataHum1 =[];
    for (let i = 0; i < DataHumRaw.length; i ++) {
      preDataHum1.push({ x: countHumRaw, y: DataHumRaw[i] });
      countHumRaw++;
    }
    preDataHum2 =[];
    for (let i = 0; i < DataHumRipe.length; i ++) {
      preDataHum2.push({ x: countHumRipe, y: DataHumRipe[i] });
      countHumRipe++;
    }
    preDataHum3 =[];
    for (let i = 0; i < DataHumVRipe.length; i ++) {
      preDataHum3.push({ x: countHumVRipe, y: DataHumVRipe[i] });
      countHumVRipe++;
    }
    dataHum1 = {
      label: 'raw',
      data: preDataHum1,
      borderColor: 'rgba(0, 191, 99,1)', 
      backgroundColor: 'rgba(0, 191, 99,1)',
    };dataHum2 = {
      label: 'ripe',
      data: preDataHum2,
      borderColor: 'rgb(102, 102, 255)',
      backgroundColor: 'rgb(102, 102, 255)',
    };dataHum3 = {
      label: 'very ripe',
      data: preDataHum3,
      borderColor: 'rgb(255, 87, 87)', 
      backgroundColor: 'rgb(255, 87, 87)',
    };
    datasetsHum = [dataHum1,dataHum2,dataHum3];
    chartDataHum();
  
  }else if(level == "raw"){

    preDataHum1 =[];
    for (let i = 0; i < DataHumRaw.length; i ++) {
      preDataHum1.push({ x: countHumRaw, y: DataHumRaw[i] });
      countHumRaw++;
    }
    dataHum1 = {
      label: 'raw',
      data: preDataHum1,
      borderColor: 'rgba(0, 191, 99,1)', 
      backgroundColor: 'rgba(0, 191, 99,1)',
      
    };
  
    datasetsHum = [dataHum1];
    chartDataHum();
  
  }else if(level == "ripe"){
    preDataHum2 =[];
    for (let i = 0; i < DataHumRipe.length; i ++) {
      preDataHum2.push({ x: countHumRipe, y: DataHumRipe[i] });
      countHumRipe++;
    }
  
    dataHum2 = {
      label: 'ripe',
      data: preDataHum2,
      borderColor: 'rgb(102, 102, 255)', 
      backgroundColor: 'rgb(102, 102, 255)',
   
    };
    datasetsHum = [dataHum2];
    chartDataHum();
  
  }else if(level == "very ripe"){
    preDataHum3 =[];
    for (let i = 0; i < DataHumVRipe.length; i ++) {
      preDataHum3.push({ x: countHumVRipe, y: DataHumVRipe[i] });
      countHumVRipe++;
    }
  
    dataHum3 = {
      label: 'very ripe',
      data: preDataHum3,
      borderColor: 'rgb(255, 87, 87)', 
      backgroundColor: 'rgb(255, 87, 87)',
  
    };
  
    datasetsHum = [dataHum3];
    chartDataHum();
  }
  var note = document.getElementById('noteHum');
  note.innerHTML =`*Note the lowest humidity value : `+minValueHum.toFixed(2)+` the highest humidity value : `+maxValueHum.toFixed(2)+` `;
  }
  function chartDataHum(){

  
    configHum = {
      type: 'scatter',
      data: {
        datasets: 
        datasetsHum
        
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            // text : 'กราฟแสดงค่าความชื้นของความสุกผลปาล์มแต่ละระดับ' ,
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
              text: 'Data sequence'
          }
          },
          y: {
            beginAtZero: true,
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Humidity value'
          }
          },
        },
      },
    };
    showchartHum();
  }
    function showchartHum() {
      const ctxHum = document.getElementById('scatterChartHum');
  
      let chartScatterHum = Chart.getChart(ctxHum);
  
      if(chartScatterHum){
        chartScatterHum.destroy(); 
      }
      chartScatterHum = new Chart(ctxHum, configHum); 
    }
  
   
    function mapToPercentage(dataPer) {
      var result = [];
      for (var i = 0; i < dataPer.length; i++) {
        var valuePer = (dataPer[i]/ 4095) * 100;
        result.push(valuePer);
      }
      return result;
    }