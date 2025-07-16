<?php
$dataArray = ["Code","Janja",true,123,234.89,null];
function typeJuggler($arr){
    // not that var_dump()=> directly output to the browser
    $len = count($arr);
    for($i=0;$i<$len;$i++){
        echo "$arr[$i] ->";
        echo gettype($arr[$i]);
        echo "<br>";
    }
}
typeJuggler($dataArray);
?>