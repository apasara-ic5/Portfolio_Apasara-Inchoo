


var dataTable = '';

var id = [];
var id_iot = [];
var date = [] ;
var red = [] ;
var blue = [];
var green = [];
var hum = [] ;
var level = [];
var process = "";
var deleteProcess ="";
const save = document.getElementById('SaveButton');
var numberPart ;
var textPart ;
window.onload = function () {
    TableData();
  };

async function TableData(dataTable) {

    try {
      const formData = new FormData(); 
      formData.append('dataTable', dataTable); 
  
      const response = await fetch('API/table.php', {
          method: 'POST',
          body: formData
      });
  
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // รับข้อมูล JSON จาก response
      console.log(data);

      
      date = data.date.map(function (dateString) {
        var date = new Date(dateString);
        var options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' , hour: '2-digit'};
        var formattedDate = date.toLocaleString('en-US', options);
        return formattedDate;
    });
    
      id = data.id;
      id_iot = data.id_iot;
      red = data.red;
      green = data.green;
      blue = data.blue;
      hum = data.humidity;
      level = data.level;
      makeTable(date,red,green,blue,hum,level);
    }catch(error) {
        console.error(error);
    }
   

}

function makeTable(date, red, green, blue, hum, level) {
    var table = document.getElementById('table');
    table.innerHTML = ``;
    // Check if the arrays have the same length before accessing their elements
    if (date.length === red.length && red.length === green.length && green.length === blue.length &&
        blue.length === hum.length && hum.length === level.length) {
        for (var i = 0; i < date.length; i++) {
            var row = document.createElement('tr');
            
            row.innerHTML = `
                <td >${id_iot[i]}</td>
                <td >${date[i]}</td>
                <td >${red[i]}</td>
                <td>${green[i]}</td>
                <td >${blue[i]}</td>
                <td >${hum[i]}</td>
                <td >${level[i]}</td>
                <td ><button  onclick="editRow(${red[i]},${green[i]},${blue[i]},${hum[i]},'${level[i]}','${date[i]}', ${id[i]})"><img src="../img/edit.png"  width="35px" height="35px"></img></button></td>
                <td ><button  onclick="deleteRow(${id[i]})"><img src="../img/delete.png" width="35px" height="35px"></img></button></td>
            `;
            table.appendChild(row);
            
        }  $(document).ready(function() {
                
                    $('#tablePalm').DataTable({
                        responsive: true
                    } );
                    document.querySelector('label[for="dt-length-0"]').textContent = 'จำนวนข้อมูลที่แสดงผล';
                    // var element = document.getElementById("tablePalm_info");
                    // console.log(translateToThai(element.textContent));
                    // translateToThai(element.textContent);
                    // element.textContent = translateToThai(element.textContent);
                    // console.log(numberPart);
                
            });
    } else {
        console.error('Array lengths do not match.');
    }
}
function editRow(redi,greeni,bluei,humi,leveli,datei,index) {
  
  const closeModalBtn = document.getElementById('closeModalBtn');
  const main = document.getElementById('main');
//   main.style.filter = 'blur(1px)';
  const modal = document.getElementById('myModal');
  modal.classList.remove('d-none');
  var red = document.getElementById('red');
  var green = document.getElementById('green');
  var blue = document.getElementById('blue');
  var hum = document.getElementById('hum');
  var level = document.getElementById('rating');
  var inputDate = document.getElementById('date');
  var id = document.getElementById('id');
  var date = new Date(datei);
  var isoDate = date.toISOString().slice(0, 10) + 'T' + datei.slice(11, 16); // แปลงเป็น ISO 8601 แบบ yyyy-mm-ddThh:mm
  inputDate.value = isoDate;
 

  red.value = redi;
  green.value = greeni;
  blue.value = bluei;
  hum.value =humi;
  level.value = leveli;
  id.value = index;
  
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('d-none');
    // main.style.filter = 'blur(0px)';
  });
    console.log('Edit row at index', id.value);
}

function deleteRow(index) {
    var confirmed = confirm('ต้องการลบข้อมูลหรือไม่?');
    if (confirmed) {
        var deId = document.getElementById('id'); 
        deId.value = index;
        console.log('Delete row at index', deId.value);
        deleteData(deId.value);
        
    }
    
}

    function formatDateForInput(date) {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      async function updateData(sendId,newDate,newRed,newGreen,newBlue,newHum,newlevel) {
            
        try {
          const formData = new FormData(); 
          formData.append('id', sendId);
          formData.append('date', newDate);
          formData.append('red', newRed);
          formData.append('green', newGreen);
          formData.append('blue', newBlue);
          formData.append('hum', newHum);
          formData.append('level', newlevel);  
          
      
          const response = await fetch('API/update.php', {
              method: 'POST',
              body: formData
          });
      
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json(); // รับข้อมูล JSON จาก response
          console.log(data);
          
       
          
          process = data.process;
          
          // ตรวจสอบว่า process เป็นอาร์เรย์หรือไม่
    
          checkUpdate();
          console.log(process);
        }catch(error) {
            console.error(error);
        }
       
    
    }

save.addEventListener('click', () => {
    var confirmed = confirm('ต้องการบันทึกข้อมูลหรือไม่?');

    if (confirmed) {
        var sendId = document.getElementById('id').value; 
        var newDate = document.getElementById('date').value;
        var newRed = document.getElementById('red').value;
        var newGreen = document.getElementById('green').value;
        var newBlue = document.getElementById('blue').value;
        var newHum = document.getElementById('hum').value;
        var newlevel = document.getElementById('rating').value;
        console.log(newRed, newGreen, newBlue, newHum, newlevel);

        updateData(sendId,newDate,newRed,newGreen,newBlue,newHum,newlevel);

    }
        
    
     


});
function checkUpdate(){
    console.log(process);
    if(process == 'succeed') {
        alert('ข้อมูลถูกบันทึกแล้ว!');
        
        }else if(process == 'Unsucceed') {
        alert('ข้อมูลไม่ได้รับการบันทึก!');}  

        location.reload();  
        const modal = document.getElementById('myModal');
        modal.classList.add('d-none');
}

async function deleteData(sendId) {
            console.log(sendId);
    try {
      const formData = new FormData(); 
      formData.append('id', sendId);

      
  
      const response = await fetch('API/delete.php', {
          method: 'POST',
          body: formData
      });
  
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); 
      console.log(data);
      
   
      
      deleteProcess = data.process;
      
      checkDelete();
      console.log(deleteProcess);
    }catch(error) {
        console.error(error);
    }
   

}
function checkDelete(){
    console.log(deleteProcess);
    if(deleteProcess == 'succeed') {
        alert('ข้อมูลถูกลบ!');
        
        }else if(deleteProcess == 'Unsucceed') {
        alert('ไม่สามารถลบข้อมูลได้!');}  

        TableData();   
        const modal = document.getElementById('myModal');
        modal.classList.add('hidden');
}

// function translateToThai(text) {
//     // แปลงเฉพาะข้อความ และเก็บตัวเลขไว้ในตัวแปร numberPart
//     numberPart = text.match(/\d+/g);
//     textPart = text.replace(/\d+/g, '');
//     console.log(numberPart);

//     // แปลงข้อความเท่านั้น
//     return "แสดง "+numberPart[0]+" ถึง "+numberPart[1]+" ของ "+numberPart[2]+" รายการ";
// }
