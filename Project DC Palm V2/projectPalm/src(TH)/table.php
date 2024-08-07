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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Table</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
      integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/2.0.0/css/dataTables.bootstrap5.css">
    <link rel="stylesheet" href="CSS/style.css" />
    <link rel="stylesheet" href="CSS/im.css" />
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/2.0.0/js/dataTables.js"></script>
    <script src="https://cdn.datatables.net/2.0.0/js/dataTables.bootstrap5.js"></script>
    <link rel="stylesheet" href="CSS/Translate.css" />
  </head>
  <body>
    <div id = "main">
    <nav>
      <div class="nav-con ">
        <div class="logo">
          <img src="../img/logo (2).png" alt="" width="45px" height="45px" class="ms-2 logo-sm"/>
          <a href="#">DC Palm</a>
        </div>
        <ul class="menu">
        <li class="nav-item dropdown Translate" id ="Translate">
              <a class="nav-link dropdown-toggle d-flex align-items-center " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src="../img/thailand.png" alt="" width="20px" class="">_TH
              
              </a>
              <ul class="dropdown-menu">
                <li><a  href="../src(EN)/table.php" class="dropdown-item d-flex align-items-center" href="#"> <img src="../img/united-kingdom.png" alt="" width="20px" class="">_EN </a></li>
              </ul>
            </li>
          <li><a href="graph.php">กราฟแสดงผล</a></li>
          <li><a href="#" onclick="logout()"  >ออกจากระบบ</a></li>
        </ul>
      </div>
    </nav>
    <div class="container" style="margin-top: 88px">
      <div class="card">
        <div class="card-body">
        <div class="table-responsive">
          <table class="table " id="tablePalm" >
            <thead>
              <tr>
                <th scope="col" style="font: size 12px;">รหัสอุปกรณ์</th>
                <th scope="col">วันที่/เวลา</th>
                <th scope="col">ค่าสีแดง</th>
                <th scope="col">ค่าสีเขียว</th>
                <th scope="col">ค่าสีน้ำเงิน</th>
                <th scope="col">ค่าความชื้น</th>
                <th scope="col">ระดับความสุก</th>
                <th scope="col">แก้ไข</th>
                <th scope="col">ลบ</th>
              </tr>
            </thead>
            <tbody class="mt-6 " id="table"></tbody>
          </table></div>
        </div>
      </div>
    </div>
</div>
    <div
    id="myModal"
      class="d-none   modalBG" 
    >
      <div class="p-6 mx-auto my-10 modalShow shadow">
        <!-- Modal content goes here -->
        <div class="mb-4">
          <span  class="d-flex justify-content-center col">แก้ไขข้อมูล</span>
          <input id="id" type="hidden" />
          <div class="row mt-2 w-100">
          <label for="" class="col-5">วันที่ : </label>
          <input
            id="date"
            type="datetime-local"
            class=" col-7"
          />
          </div>
          <div class="row mt-2 w-100">
          <label for="" class="col-5">ค่าสีแดง : </label>
          <input
            id="red"
            type="Integer"
            class="col-7"
          />
         </div>
         <div class="row mt-2 w-100">
          <label for="" class="col-5">ค่าสีน้ำเงิน : </label>
          <input
            id="blue"
            type="Integer"
            class="col-7" width="10px"
          />
         </div>
         <div class="row mt-2  w-100">
          <label for="" class="col-5">ค่าสีเขียว : </label>
          <input
            id="green"
            type="Integer"
            class="col-7"
          /></div>
          <div class="row mt-2  w-100">
              <label for="" class="col-5">ค่าความชื้น : </label>
          <input
            id="hum"
            type="Float"
            class="col-7"
          />
         </div>
         <div class="row  w-100">
          <div class="d-flex mt-2">
            <label for="rating" class="col-5">ระดับความสุก :</label>
            <div class="col-7">
              <select
                id="rating"
                name="rating"
                class=""
              >
                <option class="" value="raw">ดิบ</option>
                <option class="" value="ripe">สุก</option>
                <option class="" value="very ripe">สุกมาก</option>
                <!-- เพิ่มตัวเลือกตามความต้องการ -->
              </select>
            </div>
          </div></div>
        </div>
        <div class="d-flex justify-content-end">
        <button
          id="SaveButton"
          class="save shadow me-1"
        >
          Save
        </button>
        <button
          id="closeModalBtn"
          class="close shadow"
        >
          Close
        </button>
      </div></div>
    </div>
    <script src="JS/table.js"></script>
    <script>
    function logout() {
  fetch('API/logout.php')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = 'table.php';
        
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