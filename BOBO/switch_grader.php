<?php
function grade_switch($mark){
    switch ($mark){
        case( $mark > 0 && $mark <= 30):
         echo "scored F";
         break;

         case ($mark > 30 && $mark <= 50):
            echo "you scored a D";
        break;
        case ( $mark > 50 && $mark <= 65):
            echo "you scored C";
            break;
        case ($mark > 65 && $mark <= 80):
             echo"you scored B";
             break;
        case ($mark> 80 && $mark <=100):
            echo"you scored an A";   
            break;
            default:
            echo"not a grade"; 
}
}

grade_switch($mark= 75);
?>