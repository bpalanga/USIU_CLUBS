<?php

// 
// student name
// id
// subject and and there grade
//  --fnx
// calc gpa
// add/remov subj
// export report card as string

// ---Checking for errors
require_once "./data.php";


function viewGrade($id,$subj){
    $subjects = getSubjects($id);
    foreach($subjects as $name =>$score){
        if($subj===$name){
            echo "$name : $score";
            return;
        }
    }
}

// viewGrade(2,"math");
function getSubjects($id){
    global $students;
    for($i=0;$i<count($students);$i++){
        $student = $students[$i];
        if($id ===$student["id"]){
            return $student["subjects"];
        }
    }
}


function getGPA($id){
    $subjects = getSubjects($id);
    $total = 0;
    foreach($subjects as $subject => $score){
        $total +=$score;
    }
    $gpa = $total/count($subjects);
    return $gpa;  
}
echo "The gpa for student is ".getGPA(1);


function addSubject($id,$sub,$score){
    global $students;
    for($i=0;$i<count($students);$i++){
        if($students[$i]['id']==$id){
           $students[$i]['subjects'][$sub]=$score;    
        }
    }
    return $students;
}

function removeSubject($id,$sub){
    global $students;
    for($i=0;$i<count($students);$i++){
        if($students[$i]['id']==$id){
           unset($students[$i]['subjects'][$sub]);    
        }
    }
    return $students;
}


// echo getSubjects(1);
// echo "added pm and ai <br>";
// addSubject(1,"pm",40);
// addSubject(2,"ai",100);

viewGrade(2,'math');

// echo "added  ai <br>";
// removeSubject(2,'ai');
// viewGrade(2,'ai');
