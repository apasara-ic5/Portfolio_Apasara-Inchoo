<?php

    require_once('./connectDB.php');
    
    try{
        

        if($_SERVER['REQUEST_METHOD'] == 'GET'){
            $object = new stdClass();
            $stmt = $conn->prepare('select * from product order by Product_id ');
        
            if($stmt->execute()){
                $num = $stmt->rowCount();
                if($num > 0){
                    $object->Result = array();
                    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                        extract($row);
                        // $items = array(
                        //     "thisname" => $product_name,
                        //     "thisprice" => $price,
                        // );
                        array_push( $object->Result ,$row );
                        // array_push( $data , $row );
                    }
                    $object->RespCode = 200;
                     $object->ResMessage = 'success';
                    http_response_code(200);
                }
                // ถ้าไม่มีข้อมูล
                else{
                    $object->RespCode = 400;
                    $object->Lod = 0;
                     $object->ResMessage = 'Not Found Data';
                    http_response_code(400);
                }
                echo json_encode($object);
            }
        
             else{
                $object->RespCode = 500;
                    $object->Lod = 1;
                    $object->ResMessage = 'Not SQL';
                    http_response_code(500);
            } 
         }
        else{
            http_response_code(405);
        }
    }
    catch(PDOException $e) {
        http_response_code(500);
        echo "Connection failed: " . $e->getMessage();
      }
?>