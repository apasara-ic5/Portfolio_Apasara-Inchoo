<?php 
require("connect.php");

$levelPalm ;
$countPalm ;

$dataPalm = $db->prepare("SELECT level, count(level) AS countPalm FROM report_palm GROUP BY level");
$dataPalm->execute();

while ($dataAll = $dataPalm->fetch(PDO::FETCH_ASSOC)) {
    $levelPalm[] = $dataAll['level'];
    $countPalm [] = $dataAll['countPalm'];
}
echo json_encode(['level' => $levelPalm , 'countPalm' => $countPalm]);

?>