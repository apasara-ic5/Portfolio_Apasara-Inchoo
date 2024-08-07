<?php 
require("connect.php"); 
session_start();
$username = $_POST['user'];
$password = $_POST['password'];

$changpass = md5($password);

$checklogin = $db->prepare("SELECT * FROM user_palm WHERE username = :username AND password = :password ");
$checklogin->bindParam(':username', $username, PDO::PARAM_STR);
$checklogin->bindParam(':password', $changpass, PDO::PARAM_STR);
$checklogin->execute();
if ($checklogin->rowCount() > 0) {
    $row = $checklogin->fetch(PDO::FETCH_ASSOC);
    $_SESSION['first'] = $row['firstname'];
    $_SESSION['lastname'] = $row['lastname'];
    $_SESSION['check'] = 'check';
    echo json_encode([ 'check' => 1 ]);
}else {
    echo json_encode([ 'check' => 0]);
    $_SESSION['check'] = 'Uncheck';
}
$db = null;
?>