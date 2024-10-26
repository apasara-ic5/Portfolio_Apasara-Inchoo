<?php
    require_once('./connectDB.php');
    
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            // $object = new stdClass();
            $amount = 0;
            $product = $_POST['product'];

            $stmt = $conn->prepare('select Product_id, price from product');
            if($stmt->execute()){
                $queryproduct = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
               $items = array(
                "id" => $Product_id,
                "price" => $price
               );
               array_push($queryproduct,$items);
            }
                for ($i=0; $product ; $i++) { 
                    for ($k=0; $queryproduct ; $k++) { 
                        if( intval($product[$i]['id']) ==  intval($queryproduct[$k]['id'])){
                            $amount += intval( $product[$i]['count']) * intval($queryproduct[$k]['price']);
                            break;
                        }
                    }
                    
                }
                // $object -> RespCode = 200;
                // $object -> Amount = $amount;
                echo json_encode(['Amount' => $amount]);
                
            }
            else{
                echo json_encode(['error'=>'er']);
            }
        }
        // else{
        //     echo json_encode(['error']);
        // }
   
?>