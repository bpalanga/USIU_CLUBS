    <?php
    // echo "Hello world";
    $ContArray=[5,6.4,7];//create array
    //create function
    function TypeJagla($arr){
        //
        for($i=0;$i<3; $i++){
            // var_dump($arr[$i]);
            echo "$arr[$i] =>";//print different items of the array
            echo gettype($arr[$i]);//print type
            echo "<br>";//break

            

        
        }
    
   
  
    }
 TypeJagla($ContArray);
?>