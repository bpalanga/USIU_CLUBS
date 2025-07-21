<?php
//an create an assoiciative array
//grade and their subjct.
//a function to print it out


//create the array

require_once "./data.php";
function viewgrade($id,$subname) {
    $subjects=getSUb($id);
   foreach($subjects as $key=>$value){
        if($key ==$subname){
            echo " Found $key : $value ";
            return;
        }
    }
}
//viewgrade(1,"math");
function getSUb($id){
     global $students;
    // looping through an array to find student with the geiivebn id
    // looping in an indi studen and then loop through the subs to find marks
  
   for ($i =0; $i<count($students);$i++){
        $student=$students[$i];
        if ($student["id"]== $id){
           return $student["subjects"];
           
        
        }
  }

}
function calculateGPA($id){
//gpa sum of grades/number of subjcts
    $subjects=getSUb($id);
    $total=0;
    foreach($subjects as $subject=> $score){
        // echo $score;
        $total+= $score;
    }
    $gpa=$total/count($subjects);
    return $gpa;
}
echo "the gpa is " .calculateGPA(1)."<br>";

function addSUbject($id,$sub,$score){
    // global $students;
    // for ($i=0;$i<count($students);$i++){
    //     if ($students[$i]["id"]==$id){
    //       $students[$i]['subjects'][$sub]=$score;
           

    //     }
    // }

    // return $students;
}

function removeItem($id,$sub){
    global $students;
    for ($i=0;$i<count($students);$i++){
        if ($students[$i]["id"]==$id){
            unset($students[$i]['subjects'][$sub]);
           
        }
    }
    return $students;
}
// a
viewgrade(1,"math");
?>