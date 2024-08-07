<?php 
require("connect.php");

$process = "Unsucceed"; // กำหนดค่าเริ่มต้น

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    // ใช้ prepared statement เพื่อป้องกัน SQL Injection
    $stmt = $db->prepare("DELETE FROM Report_palm WHERE id_report = :id");
    $stmt->bindParam(':id', $id);

    // ทำการ execute และตรวจสอบผลลัพธ์
    if ($stmt->execute()) {
        $process = "succeed";
    }
}

// ส่งคำตอบเป็น JSON
echo json_encode(['process' => $process]);
?>