<?php 
session_start();


if (isset($_SESSION['check'])){
if( $_SESSION['check'] == 'check'){
  header("Location: graph.php");
  exit();
}}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Bootstrap demo</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />

   <link rel="stylesheet" href="CSS/login.css">
  </head>
  <body>
        <div class="center shadow-lg">
            <div class="lo shadow-lg">
            <img src="../img/logo (2).png" alt="" width="45px" height="45px">
            <h1>เข้าสู่ระบบ</h1>
            </div>
            <form method="post" id="loginForm">
                <div class="text_field">
                    <input type="text" required id="username">
                    <span></span>
                    <label>ชื่อผู้ใช้งาน</label>
                </div>
                <div class="text_field">
                    <input type="password" required id="password">
                    <span></span>
                    <label>รหัสผ่าน</label>
                </div>
                <input type="submit" value="Login">
               
            </form>
            <div class="w-100 d-flex justify-content-center">
            <a href="index.html" class="text-center">หน้าแรก</a></div>
        </div>

        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="JS/checkLogin.js"></script>
        <script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
        }
        document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();
      login();
    });

   
        </script>
  </body>
</html>
