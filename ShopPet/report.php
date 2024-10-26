<?php
require_once('./api/connectDB.php');
//กราฟแท่ง1********************
$sql = "SELECT product_name, SUM(numbers) AS total_numbers FROM orderbill GROUP BY product_name";

$stmt = $conn->prepare($sql);
$stmt->execute();

// เก็บข้อมูลที่ดึงมาไว้ใน array
$product_name = [];
$numbers = [];

// ดึงข้อมูลในรูปแบบ associative array
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($result as $row) {
  $product_name[] = $row['product_name'];
  $numbers[] = $row['total_numbers'];
}

// แปลงข้อมูลเป็น JSON เพื่อใช้งานกับ JavaScript
$product_name = json_encode($product_name);
$numbers = json_encode($numbers);

//กราฟแท่ง2************************

$sql = "SELECT type_name, SUM(price * numbers) AS total_sales 
            FROM orderbill 
            GROUP BY type_name 
            ORDER BY total_sales DESC"; // เรียงลำดับจากยอดขายสูงสุด
    $stmt1 = $conn->prepare($sql);
    $stmt1->execute();

    // เก็บข้อมูลที่ดึงมาไว้ใน array
    $type_name = [];
    $total_sales = [];

    // ดึงข้อมูลในรูปแบบ associative array
    $result = $stmt1->fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as $row) {
        $type_name[] = $row['type_name'];
        $total_sales[] = $row['total_sales'];
    }

    // แปลงข้อมูลเป็น JSON เพื่อใช้งานกับ JavaScript
    $type_name = json_encode($type_name);
    $total_sales = json_encode($total_sales);

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>หน้ารายงาน</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js"></script>

  <link rel="stylesheet" href="report.css">
  <!-- font-awesome -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer" />
  <!-- slick js -->
  <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
  <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
</head>

<body>
  <!-- Navber -->
  <nav>
    <div class="nav-container">
      <a href="home.html">
        <img src="img/LOGO-Pilin_PetShop.png" class="logonav" />
      </a>

      <div class="navber">
        <a href="home.html" class="navber-name">หน้าแรก</a>
        <a href="Product.html" class="navber-name">สินค้า</a>
        <a href="article.html" class="navber-name">บทความ</a>
        <a href="report.html" class="navber-name">รายงาน</a>
        <!-- <div onclick="openCart()" style="cursor: pointer" class="nav-cart">
            <i class="fas fa-cart-shopping"></i> -->
        <!-- <div id="cartcount" class="cartcount" style="display: none">0</div> -->
      </div>
    </div>
    </div>
  </nav>

  <div class="head">
    <h1>รายงาน : สินค้าขายดี</h1>
  </div>
  <div style="width: 600px; height: 400px" class="bar">
    <canvas id="myChart">
    </canvas>
  </div>

  <script>
    // ข้อมูล product_name และ numbers ที่ดึงมาจาก PHP
    var product_name = <?php echo $product_name; ?>;
    var numbers = <?php echo $numbers; ?>;

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: product_name, // ใช้ product_name เป็น label
        datasets: [{
          label: 'จำนวนสินค้า',
          data: numbers, // ใช้ numbers เป็นข้อมูลสำหรับกราฟ
          backgroundColor: 'rgb(239, 228, 200)',
          borderColor: 'rgb(185, 155, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
                        title: {
                            display: true,
                            text: 'จำนวนสินค้า (ชิ้น)'
          }
        }
      }
    }});
  </script>


  <div class="head">
    <h1>รายงาน : ยอดขายประเภทสินค้าขายดี</h1>
  </div>
  <div style="width: 600px; height: 400px" class="bar">
    <canvas id="salesChart">
    </canvas>
  </div>

  <script>
        // ข้อมูล type_name และ total_sales ที่ดึงมาจาก PHP
        var type_name = <?php echo $type_name; ?>;
        var total_sales = <?php echo $total_sales; ?>;

        var ctx = document.getElementById('salesChart').getContext('2d');
        var salesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: type_name, // ใช้ type_name เป็น label
                datasets: [{
                    label: 'ยอดขายรวม (บาท)',
                    data: total_sales, // ยอดขายรวมของแต่ละประเภท
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'ยอดขายรวม (บาท)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'rgb(75, 192, 192)'
                        }
                    }
                }
            }
        });
    </script>

</body>

</html>