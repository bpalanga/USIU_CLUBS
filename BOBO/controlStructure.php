<?php 
$mark= 85 ;
if ($mark > 0 && $mark <= 30){
     echo "scored F";

}elseif( $mark > 30 && $mark <= 50){
    echo "you scored a D";
}elseif($mark > 50 && $mark <= 65){
    echo "you scored C";
} elseif($mark > 65 && $mark <= 80){
    echo"you scored B";

}elseif($mark> 80 && $mark <=100){
    echo"you scored an A";
}else{
    echo"not a grade";
}

     
?>

