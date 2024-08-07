

var check = "";
var firstname = "";
var lastname = "";
    
  
async function login(){

    var user = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(user);
    
    try {
        const formData = new FormData(); 
        formData.append('user', user); 
        formData.append('password', password); 
    
        const response = await fetch('API/checkLogin.php', {
            method: 'POST',
            body: formData
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json(); // รับข้อมูล JSON จาก response
        console.log(data);
  
        if(data.check == 1){
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            window.location.href = "graph.php";
        }else{
            document.getElementById("errorLogin").style.display = "block";
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }
    }catch(error) {
        console.error(error);
    }
    
    }