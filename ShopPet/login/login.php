<?php 
session_start();
require_once ('../api/connectDB.php');
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Login</title>
   <link rel="stylesheet" href="login.css">
  </head>
  <body>
    <div class="center shadow-lg">
        <div class="lo shadow-lg">
        <h1>Login</h1>
        </div>
        <form action="" method="post">
            <div class="text_field">
                <input type="text" required name="username" >
                <span></span>
                <label>username</label>
            </div>
            <div class="text_field">
                <input type="password" required name="password">
                <span></span>
                <label>password</label>
            </div>
            <input type="submit" value="Login">
        </form>
        <a href="../home.html">Back</a>
       
      
   
  </body>
</html>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username']; // รับค่าชื่อผู้ใช้จากฟอร์ม
  $password = $_POST['password']; // รับค่ารหัสผ่านจากฟอร์ม

  // คำสั่ง SQL เพื่อตรวจสอบผู้ใช้
  $sql = "SELECT * FROM customer WHERE username='$username' AND password='$password'";
  $result = $conn->query($sql);

   // ตรวจสอบว่าพบผู้ใช้หรือไม่
  if ($result->rowCount() == 1) {
      // ถ้าพบผู้ใช้ที่ตรงกัน
      $row = $result->fetch(PDO::FETCH_ASSOC);
      $_SESSION["username"] = $username; // เก็บชื่อผู้ใช้ใน session
      $_SESSION["customer_id"] = $row['customer_id']; // เก็บ customer_id ใน session
      header("Location: ../Product.html");
  } else {
      // ถ้าไม่พบผู้ใช้ที่ตรงกัน
      echo "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
  }
}
?>
