<?php
session_start();

if( $_SESSION['check'] != 'check'){
  header("Location: log.php");
  exit();
}else{
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Graph</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="CSS/dropdown.css">
    <link rel="stylesheet" href="CSS/style.css">
    <link rel="stylesheet" href="CSS/Translate.css">
  </head>
  <body>
    <nav>
      <div class="nav-con ">
        <div class="logo">
          <img src="../img/logo (2).png" alt="" width="45px" height="45px" class="logo-sm ">
          <a href="#"class="ms-2">DC Palm</a>
        </div>
        <ul class="menu">
        <li class="nav-item dropdown Translate" id ="Translate">
              <a class="nav-link dropdown-toggle d-flex align-items-center " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src="../img/thailand.png" alt="" width="20px" class="">_TH
              
              </a>
              <ul class="dropdown-menu">
                <li><a  href="../src(EN)/graph.php" class="dropdown-item d-flex align-items-center" href="#"> <img src="../img/united-kingdom.png" alt="" width="20px" class="">_EN </a></li>
              </ul>
            </li>
          <li><a href="table.php" class=""> ตาราง</a></li>
          <li><a href="#" onclick="logout()" class="">ออกจากระบบ</a></li>
          
        </ul>
      </div>
    
  </nav>

    <br>
    <div class="container card card_ma" style="height: auto; ">
      <div class="card-body">
        <div class=" justify-content-center ">
          <h3 class=" text-center my-3">กราฟแสดงจำนวนของปาล์มแต่ละระดับความสุก</h3>
        </div>
          <div class="p-4 mt-2 pad-sm graph-container"   >
            <canvas id="BarChart" class=""style="" width="20vh" height="5vw"></canvas>
          </div>
      </div>
    </div>

    <div class="container card mt-4" style="height: auto; ">
      <div class="card-body">
        <div class=" justify-content-center ">
          <h3 class=" text-center my-3">กราฟแสดงความสัมพันธ์ระหว่างค่าสีและระดับความสุก</h3>
        </div>
    <div class="row  d-flex align-items-center ">
      <div class="col-md-4 ">
        <div class="row">

          <div class=" justify-content-center col text-center">
    <div class=" card shadow w-100"style="width:fit-content;">  
      <div class="card-body" >
        <div class="">
        <div class="" >
        <h5>ระดับความสุก</h5>
      </div>
        <div class="">
        <div class="dropdown"  id="dropColor">
          <button
            class="btn btn-light shadow-sm "
            type="button"
            id="dropdownMenuButtonLevel"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          ทั้งหมด
          </button>
          <ul class="dropdown-menu " id = 'levelSelect'>
            <li><a class="dropdown-item disabled" onclick="dropdownLevel('All')" id="All" href="#">ทั้งหมด</a></li>
            <li><a class="dropdown-item" onclick="dropdownLevel('Raw')" id="Raw" href="#">ดิบ</a></li>
            <li><a class="dropdown-item" onclick="dropdownLevel('Ripe')" id="Ripe" href="#">สุก</a></li>
            <li><a class="dropdown-item" onclick="dropdownLevel('Very Ripe')" id="Very Ripe" href="#">สุกมาก</a></li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  </div>
</div>

<div class="d-flex justify-content-center col text-center">
    <div class=" card shadow mt-md-3 w-100"style="width:fit-content;">  
    <div class="card-body ">
      <h5>ค่าสี</h5>
      <div class="text-center">
      <div class="dropdown"  id="dropColor">
        <button
          class="btn btn-light shadow-sm"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
        แดง
        </button>
        <ul class="dropdown-menu" id="colorSelect">
          <li><a  class="dropdown-item disabled" onclick="dropdownColor('Red')" id="Red" href="#">แดง</a></li>
          <li><a  class="dropdown-item" onclick="dropdownColor('Green')" id="Green" href="#">เขียว</a></li>
          <li><a  class="dropdown-item" onclick="dropdownColor('Blue')" id="Blue" href="#">น้ำเงิน</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>
<div class="col-md-8 text-center align-items-center justify-content-center "  >
<div class="" >
  <div class="">
<div class="p-4 mt-2 pad-sm graph-container"   >
  <canvas id="scatterChartColor" class=""style="  "></canvas>
  </div>
</div>
<div>
          <h6 id="note" style="display: block;" ></h6>
        </div>
</div>
</div>
</div>
</div>
</div>

<div class="container card h-lg-100 mt-4 mb-3" style="height: auto;">
  <div class="card-body ">
    <div class="d-flex justify-content-center ">
      <h3 class="text-center my-3">กราฟแสดงความสัมพันธ์ระหว่างค่าความชื้นและระดับความสุก</h3>
    </div>
<div class="row  align-items-center ">
  <div class="col-md-4 ">
    <div class="row">
<div class=" d-flex justify-content-center text-center col">
  <div class="card shadow w-100"style="">  
    <div class="card-body  " >
      <div class="">
      <h5>ระดับความสุก</h5>

      <div class="text-center">
      <div class="dropdown"  id="dropColor">
        <button
          class="btn btn-light shadow-sm"
          type="button"
          id="dropdownMenuButtonLevelHum"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
        ทั้งหมด
        </button>
        <ul class="dropdown-menu " id = 'levelSelectHum'>
          <li><a class="dropdown-item disabled" onclick="dropdownLevelHum('All2')" id="All2" href="#">ทั้งหมด</a></li>
          <li><a class="dropdown-item" onclick="dropdownLevelHum('Raw2')" id="Raw2" href="#">ดิบ</a></li>
          <li><a class="dropdown-item" onclick="dropdownLevelHum('Ripe2')" id="Ripe2" href="#">สุก</a></li>
          <li><a class="dropdown-item" onclick="dropdownLevelHum('Very Ripe2')" id="Very Ripe2" href="#">สุกมาก</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
</div>
<div class="col hide"></div></div>
</div>
<div class="col-md-8">
  <div class="">
  <div class="p-4 graph-container" >
    <canvas id="scatterChartHum" class=""></canvas>
  </div>
  <div>
          <h6 id="noteHum" style="display: block;" ></h6>
        </div>
</div>
</div></div></div>
</div>
    <script>

    </script>
    <script
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
      integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
      integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
      crossorigin="anonymous"
    ></script>
    <script src="JS/chart.js"></script>
    <script src="JS/barChart.js"></script>
    <script src="JS/chartHum.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
  
    <script>
    function logout() {
  fetch('API/logout.php')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = 'graph.php';
        
      } else {
        console.error('Logout failed');
      }
    })
    .catch(error => console.error('Error:', error));
}
</script>
  </body>
</html>
<?php } ?>