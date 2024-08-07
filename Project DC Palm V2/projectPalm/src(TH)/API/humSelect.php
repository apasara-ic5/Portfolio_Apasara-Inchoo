<?php
require("connect.php");

$level = $_POST['level'];

$countRipe = [];
$countRaw = [];
$countVRipe = [];

$humRipe = [];
$humRaw = [];
$humVRipe = [];

$levelRaw = 'raw';
$levelRipe = 'ripe';
$levelVRipe = 'very ripe';

if ($level == "all" || $level == "All") {
    $dataChart = $db->prepare("SELECT  value_hum FROM Report_palm WHERE level = :level  ");
    $dataChart->bindParam(':level', $levelRaw);
    $dataChart->execute();
    while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
        $humRaw[] = $dataAll['value_hum'];
    }

    $dataChart->bindParam(':level', $levelRipe);

    $dataChart->execute();
    while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
        $humRipe[] = $dataAll['value_hum'];
    }

    $dataChart->bindParam(':level', $levelVRipe);

    $dataChart->execute();
    while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
        $humVRipe[] = $dataAll['value_hum'];
    }

    echo json_encode(['humRaw' => $humRaw,'humRipe' => $humRipe,'humVRipe' => $humVRipe]);
} else if ($level == "raw") {
    $dataChart = $db->prepare("SELECT  value_hum FROM Report_palm WHERE level = :level ");
    $dataChart->bindParam(':level', $levelRaw);

    $dataChart->execute();
    while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
        $humRaw[] = $dataAll['value_hum'];
    }
    echo json_encode([ 'humRaw' => $humRaw]);

}else if ($level == "ripe") {
    $dataChart = $db->prepare("SELECT  value_hum FROM Report_palm WHERE level = :level ");
    $dataChart->bindParam(':level', $levelRipe);

    $dataChart->execute();
    while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
        $humRipe[] = $dataAll['value_hum'];
    }
    echo json_encode(['humRipe' => $humRipe]);

}else if ($level == "very ripe") {
    $dataChart = $db->prepare("SELECT  value_hum FROM Report_palm WHERE level = :level ");
    $dataChart->bindParam(':level', $levelVRipe);

    $dataChart->execute();
    while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
        $humVRipe[] = $dataAll['value_hum']; 
    }
    echo json_encode(['humVRipe' => $humVRipe]);

}

$db = null;



?>