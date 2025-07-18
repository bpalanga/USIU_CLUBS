<?php
$mark = 80.01;

if($mark>0 && $mark<=30){
  echo "Scored F";
}elseif($mark>30 && $mark<=50){
    echo "Scored D";
}elseif($mark >50 && $mark <=65){
    echo "Scored C";
}elseif($mark >65 && $mark <=80){
    echo "Scored B";
}elseif($mark >80 && $mark <=100){
    echo "Scored A";
}
else{
    echo "Opps! not a mark";
}
?>