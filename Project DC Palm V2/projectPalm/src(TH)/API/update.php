<?php 
require("connect.php");

$id = $_POST['id'];
$date = $_POST['date'];
$red =$_POST['red'];
$green = $_POST['green'];
$blue = $_POST['blue'];
$hum = $_POST['hum'] ;
$level = $_POST['level'];

$process = "Unsucceed";


if(isset($_POST['date']) && $_POST['date'] != " ") {
    $stmt = $db->prepare("UPDATE Report_palm  SET  value_red = :red, value_green = :green, value_blue = :blue, date_time = :date, level = :level, value_hum = :hum WHERE id_report  = :id");

// กำหนดค่าพารามิเตอร์
$stmt->bindParam(':date', $date);
$stmt->bindParam(':level', $level);
$stmt->bindParam(':hum', $hum);
$stmt->bindParam(':red', $red);
$stmt->bindParam(':green', $green);
$stmt->bindParam(':blue', $blue);
$stmt->bindParam(':id', $id);

if ($stmt->execute()) {
    $process = "succeed";
}
    
} else {
    $stmt = $db->prepare("UPDATE Report_palm  SET  value_red = :red, value_green = :green, value_blue = :blue, level = :level, value_hum = :hum WHERE id_report  = :id");

    $stmt->bindParam(':level', $level);
    $stmt->bindParam(':hum', $hum);
    $stmt->bindParam(':red', $red);
    $stmt->bindParam(':green', $green);
    $stmt->bindParam(':blue', $blue);
    $stmt->bindParam(':id', $id);
    
    if ($stmt->execute()) {
        $process = "succeed";
    }
}
    echo json_encode([ 'process' =>$process]);

?>