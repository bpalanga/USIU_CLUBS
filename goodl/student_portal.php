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


$students = [
    [
        "id"=>1,
        "fName"=>"Code",
        "lName"=>"Janja",
        "subjects"=>[
            "math"=>90,
            "apt1020"=>80,
            "ist2045"=>87
        ],
    ],
    [
        "id"=>2,
        "fName"=>"Amina",
        "lName"=>"Nyongesa",
        "subjects"=>[
            "math"=>72,
            "apt1020"=>85,
            "ist2045"=>78
        ],
    ],
    [
        "id"=>3,
        "fName"=>"Brian",
        "lName"=>"Otieno",
        "subjects"=>[
            "math"=>65,
            "apt1020"=>70,
            "ist2045"=>75
        ],
    ],
    [
        "id"=>4,
        "fName"=>"Chipo",
        "lName"=>"Moyo",
        "subjects"=>[
            "math"=>88,
            "apt1020"=>91,
            "ist2045"=>94
        ],
    ],
    [
        "id"=>5,
        "fName"=>"David",
        "lName"=>"Kariuki",
        "subjects"=>[
            "math"=>79,
            "apt1020"=>68,
            "ist2045"=>82
        ],
    ],
];

function viewGrade($id,$subj){
    global $students;
    for($i=0;$i<count($students);$i++){
        $student = $students[$i];
        if($id ===$student["id"]){
            $subjects = $student["subjects"];
            foreach($subjects as $name =>$score){
                if($subj===$name){
                    echo "$name : $score";
                    return;
                }
            }
            echo "Subject Not found";
            return;
            
        }
    }

    echo "Student Not Found";
}

viewGrade(2,"math");