<?php
session_start();
require_once('./connectDB.php');


$customer_id = $_SESSION['customer_id'];
$amount = $_POST['amount'];

$stmt0 = $conn->prepare("INSERT INTO bill (customer_id, amount) VALUES (?, ?)");
$stmt0->execute([$customer_id, $amount]);

$bill_id = $conn->lastInsertId();

$jsonCart = $_POST['product']; 

$cart = json_decode($jsonCart, true);

$stmt1 = $conn->prepare("INSERT INTO orderbill (bill_id, type_name, product_name, price, numbers) VALUES (?, ?, ?, ?, ?)");

foreach ($cart as $item) {
    $product_id = $item['id']; // ดึงค่า id ของสินค้า
    $type_name = $item['type_name']; // ดึงค่า type_name ของสินค้า
    $name = $item['name']; // ดึงชื่อสินค้า
    $price = $item['price']; // ดึงราคาสินค้า
    $count = $item['count']; // ดึงจำนวนสินค้า


    $stmt1->execute([$bill_id, $type_name, $name, $price, $count]);
}
// echo '<pre>';
// print_r($cart);
// echo '</pre>';
echo json_encode(['response' => $cart]);
