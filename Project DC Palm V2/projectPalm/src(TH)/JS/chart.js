

var color = 'value_red';
var level = 'All';
const data = '';

var DataColorRaw  ;
var DataColorRipe ;
var DataColorVRipe ;


var countColorRaw = 1;
var countColorRipe =1;
var countColorVRipe = 1;


var preDataColor1 =[];
var preDataColor2 =[];
var preDataColor3 =[];
var preDataHum1 =[];
var preDataHum2 =[];
var preDataHum3 =[];

var maxValue ;
var minValue ;
var allValues =[];


function dropdownColor(colorSelector) {
  var item = document.getElementById(colorSelector);
  var dropdown = document.getElementById('dropdownMenuButton');
  var dropdownItems  = document.getElementById('colorSelect').getElementsByClassName('dropdown-item');
  for (var i = 0; i < dropdownItems.length; i++) {
  dropdownItems[i].classList.remove('disabled');
  }
  if(colorSelector == "Red"){
    dropdown.innerText = "แดง";
  }else if(colorSelector == "Green"){
    dropdown.innerText = "เขียว";
  }else if(colorSelector == "Blue"){
    dropdown.innerText = "น้ำเงิน";
  }
 
  
  item.classList.add('disabled');
  color = colorSelector;
  color = color.toLowerCase();
  if (color =="red"){
    color = "value_red";
  }else if (color == "green"){
    color = "value_green";
  }else if (color == "blue"){
    color = "value_blue";
  }
  event.preventDefault();
  PrepareData();
 }
 function dropdownLevel(levelSelector) {
  var item = document.getElementById(levelSelector);
  var dropdown = document.getElementById('dropdownMenuButtonLevel');
  var dropdownItems  = document.getElementById('levelSelect').getElementsByClassName('dropdown-item');
  for (var i = 0; i < dropdownItems.length; i++) {
  dropdownItems[i].classList.remove('disabled');
  }
  if(levelSelector == "All"){
    dropdown.innerText = "ทั้งหมด";
  }else if(levelSelector == "Raw"){
    dropdown.innerText = "ดิบ";
  }else if(levelSelector == "Ripe"){
    dropdown.innerText = "สุก";
  }else if(levelSelector == "Very Ripe"){
    dropdown.innerText = "สุกมาก";
  }
  
  item.classList.add('disabled');
  level = levelSelector;
  level = level.toLowerCase();
  event.preventDefault();
  PrepareData();
 }

function PrepareData(){
 countColorRaw = 1;
 countColorRipe =1;
 countColorVRipe = 1;

 
 maxValue = 0;
 minValue = 0;
 allValues =[];
 
  console.log(color);
  console.log(level);

 ScatterData(color,level);
}
var datasets = [];

async function ScatterData(color,level) {

  var dataToSend = {
    color: color,
    level: level
  };
  try {
    const formData = new FormData(); // สร้างออบเจ็กต์ FormData
    formData.append('color', color); // เพิ่มค่า color เข้าไปใน FormData
    formData.append('level', level); // เพิ่มค่า level เข้าไปใน FormData

    const response = await fetch('API/graphSelect.php', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // รับข้อมูล JSON จาก response
    console.log(data);

    if(level == "All" || level == "all"){
      
      DataColorRaw = data.colorRaw.map(Number);
      DataColorRipe = data.colorRipe.map(Number);
      DataColorVRipe = data.colorVRipe.map(Number);
      allValues = [...DataColorRaw, ...DataColorRipe, ...DataColorVRipe];

      maxValue = Math.max(...allValues);
      minValue = Math.min(...allValues);
    
    }else if(level == "raw"){
      DataColorRaw = data.colorRaw.map(Number);
      maxValue = Math.max(...DataColorRaw);
      minValue = Math.min(...DataColorRaw);
    }else if(level == "ripe"){
      DataColorRipe = data.colorRipe.map(Number);
      maxValue = Math.max(...DataColorRipe);
      minValue = Math.min(...DataColorRipe);
    }else if(level == "very ripe"){
      DataColorVRipe = data.colorVRipe.map(Number);
      maxValue = Math.max(...DataColorVRipe);
      minValue = Math.min(...DataColorVRipe);
    }
console.log(countColorRaw);
    
} catch (error) {
    console.error(error);
}


if(level == "All" || level == "all"){
  preDataColor1 =[];
  for (let i = 0; i < DataColorRaw.length; i ++) {
    preDataColor1.push({ x: countColorRaw , y: DataColorRaw[i] });
    countColorRaw++;
  }
  preDataColor2 =[];
  for (let i = 0; i < DataColorRipe.length; i ++) {
    preDataColor2.push({ x:countColorRipe, y:  DataColorRipe[i] });
    countColorRipe++;
  }
  preDataColor3 =[];
  for (let i = 0; i < DataColorVRipe.length; i ++) {
    preDataColor3.push({ x:countColorVRipe  , y: DataColorVRipe[i] });
    countColorVRipe++;
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
    borderColor: 'rgb(102, 102, 255)', // Red
    backgroundColor: 'rgb(102, 102, 255)',
    
    // Add more data points as needed
  };dataColor3 = {
    label: 'สุกมาก',
    data: preDataColor3,
    borderColor: 'rgb(255, 87, 87)', // Red
    backgroundColor: 'rgb(255, 87, 87)',
    
    // Add more data points as needed
  };
  
  datasetsColor = [dataColor1,dataColor2,dataColor3];
  chartData();

}else if(level == "raw"){

  preDataColor1 =[];
  for (let i = 0; i < DataColorRaw.length; i ++) {
    preDataColor1.push({ x: countColorRaw , y: DataColorRaw[i] });
    countColorRaw++;
  }

  dataColor1 = {
    label: 'ดิบ',
    data: preDataColor1,
    borderColor: 'rgba(0, 191, 99,1)', 
    backgroundColor: 'rgba(0, 191, 99,1)',

  };
 
  datasetsColor = [dataColor1];
  chartData();

}else if(level == "ripe"){
  
  preDataColor2 =[];
  for (let i = 0; i < DataColorRipe.length; i ++) {
    preDataColor2.push({ x:countColorRipe, y:  DataColorRipe[i] });
    countColorRipe++;
  }

  dataColor2 = {
    label: 'สุก',
    data: preDataColor2,
    borderColor: 'rgb(102, 102, 255)', 
    backgroundColor: 'rgb(102, 102, 255)',

  };

  datasetsHum = [dataHum2];
  datasetsColor = [dataColor2];
  chartData();

}else if(level == "very ripe"){
 
  preDataColor3 =[];
  for (let i = 0; i < DataColorVRipe.length; i ++) {
    preDataColor3.push({ x:countColorVRipe  , y: DataColorVRipe[i] });
    countColorVRipe++;
  }
  
  dataColor3 = {
    label: 'สุกมาก',
    data: preDataColor3,
    borderColor: 'rgb(255, 87, 87)', 
    backgroundColor: 'rgb(255, 87, 87)',
  
  };

  datasetsColor = [dataColor3];
  chartData();
}
var note = document.getElementById('note');
note.innerHTML =`*หมายเหตุ ค่าสีที่ต่ำที่สุด : `+minValue+`  ค่าสีที่สูงที่สุด : `+maxValue+` `;
}
function chartData(){


  configColor = {
    type: 'scatter',
    data: {
      datasets: 
      datasetsColor
      
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
          // text : 'กราฟแสดงค่า RGB ของความสุกผลปาล์มแต่ละระดับ' ,
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
            text: 'ลำดับของข้อมูล'
        }
        },
        y: {
          beginAtZero: true,
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'ระดับค่าสี'
        }
        },
      },
    },
  };

  showchart();
}
  function showchart() {
    const ctxColor = document.getElementById('scatterChartColor');

    let chartScatterColor = Chart.getChart(ctxColor);

    if (chartScatterColor) {
      chartScatterColor.destroy(); 
    }
    chartScatterColor = new Chart(ctxColor, configColor); 
  }

 
  