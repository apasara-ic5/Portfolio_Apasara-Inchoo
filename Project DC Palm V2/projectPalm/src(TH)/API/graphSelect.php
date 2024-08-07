<?php
require("connect.php");

$color = $_POST['color'];
$level = $_POST['level'];

$colorRipe = [];
$colorRaw = [];
$colorVRipe = [];

$countColorRipe = [];
$countColorRaw = [];
$countColorVRipe = [];

$levelRaw = 'raw';
$levelRipe = 'ripe';
$levelVRipe = 'very ripe';

$dataX = [];
$dataY = [];

if ($level == "all" || $level == "All") {
    $dataChart = $db->prepare("SELECT $color FROM report_palm WHERE level = :level ");
    
    $dataChart->bindParam(':level', $levelRaw);

    $dataChart->execute();
    while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
        $colorRaw[] = $dataAll[$color];
    }

    $dataChart->bindParam(':level', $levelRipe);

    $dataChart->execute();
    while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
        $colorRipe[] = $dataAll[$color];
    }

    $dataChart->bindParam(':level', $levelVRipe);

    $dataChart->execute();
    while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
        $colorVRipe[] = $dataAll[$color];
    }

    echo json_encode(['colorRaw' => $colorRaw, 'colorRipe' => $colorRipe, 'colorVRipe' => $colorVRipe]);
} else if ($level == "raw") {
    $dataChart = $db->prepare("SELECT $color FROM report_palm WHERE level = :level ");
    $dataChart->bindParam(':level', $levelRaw);

    $dataChart->execute();
    while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
        $colorRaw[] = $dataAll[$color];
    }

    echo json_encode(['colorRaw' => $colorRaw]);

}else if ($level == "ripe") {
    $dataChart = $db->prepare("SELECT $color FROM report_palm WHERE level = :level ");
    $dataChart->bindParam(':level', $levelRipe);

    $dataChart->execute();
    while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
        $colorRipe[] = $dataAll[$color];
    }
    echo json_encode([ 'colorRipe' => $colorRipe]);

}else if ($level == "very ripe") {
    $dataChart = $db->prepare("SELECT $color FROM report_palm WHERE level = :level ");
    $dataChart->bindParam(':level', $levelVRipe);

    $dataChart->execute();
    while ($dataAll = $dataChart->fetch(PDO::FETCH_ASSOC)) {
        $colorVRipe[] = $dataAll[$color];
    }
    echo json_encode(['colorVRipe' => $colorVRipe]);

}

// Execute the prepared statement


// Close the database connection
$db = null;



?>

