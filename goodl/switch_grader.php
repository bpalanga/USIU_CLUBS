<?php
    function switchGrader($mark){
        switch($mark){
            case ($mark>0 && $mark<=30):
                echo "Scored F";
                break;
            case ($mark>30 && $mark<=50):
                echo "Scored D";
                break;
            case ($mark >50 && $mark <=65):
                echo "Scored C";
                break;
            case ($mark >65 && $mark <=80):
                echo "Scored B";
                break;
            case ($mark >80 && $mark <=100):
                echo "Scored A";
                break;
            default:
                echo "Oops! Not a Mark";
        }

    }
    $grade = 69;
    switchGrader($grade);
?>