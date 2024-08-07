<?php 
require("connect.php");

$data = $_POST['dataTable'];

$id = [];
$id_iot =[];
$date = [];
$red =[];
$blue = [];
$green = [];
$hum = [];
$level = [];

$dataTable = $db->prepare("SELECT * FROM Report_palm ");

$dataTable->execute();
    while ($dataAll = $dataTable->fetch(PDO::FETCH_ASSOC)) {
        $id[] = $dataAll['id_report'];
        $id_iot[]= $dataAll['IoT_id'];
        $hum[] = $dataAll['value_hum'];
        $red[] = $dataAll['value_red'];
        $blue[] = $dataAll['value_blue'];
        $green[] = $dataAll['value_green'];
        $date[] = $dataAll['date_time'];
        $level[] = $dataAll['level'];
    }
    echo json_encode([ 'id' => $id,'id_iot'=>$id_iot,'date' => $date , 'humidity' => $hum,'red' => $red , 'blue' => $blue , 'green'=>$green , 'level'=> $level]);

?>