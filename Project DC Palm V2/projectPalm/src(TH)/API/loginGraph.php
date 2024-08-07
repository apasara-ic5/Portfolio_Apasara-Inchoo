<?php 
require("connect.php");

$color = 'Red';


$colorRipe = [];
$colorRaw = [];
$colorVRipe = [];

$humRipe = [];
$humRaw = [];
$humVRipe = [];

$levelRaw = 'raw';
$levelRipe = 'ripe';
$levelVRipe = 'very ripe';

$dataChart = $db->prepare("SELECT $color, humidity FROM dataplam WHERE level = :level");
    
$dataChart->bindParam(':level', $levelRaw);

$dataChart->execute();
while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
    $colorRaw[] = $dataAll[$color];
    $humRaw[] = $dataAll['humidity'];
}

$dataChart->bindParam(':level', $levelRipe);

$dataChart->execute();
while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
    $colorRipe[] = $dataAll[$color];
    $humRipe[] = $dataAll['humidity'];
}

$dataChart->bindParam(':level', $levelVRipe);

$dataChart->execute();
while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
    $colorVRipe[] = $dataAll[$color];
    $humVRipe[] = $dataAll['humidity'];
}

echo json_encode(['colorRaw' => $colorRaw, 'humRaw' => $humRaw, 'colorRipe' => $colorRipe, 'humRipe' => $humRipe, 'colorVRipe' => $colorVRipe, 'humVRipe' => $humVRipe]);
?>