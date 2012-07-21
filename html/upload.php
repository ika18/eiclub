<?php

// $error_message[0] = "Unknown problem with upload.";
// $error_message[1] = "Uploaded file too large (load_max_filesize).";
// $error_message[2] = "Uploaded file too large (MAX_FILE_SIZE).";
// $error_message[3] = "File was only partially uploaded.";
// $error_message[4] = "Choose a file to upload.";

// $upload_dir  = './tmp/';
// $num_files = count($_FILES['user_file']['name']);

// for ($i=0; $i < $num_files; $i++) {
//     $upload_file = $upload_dir . basename($_FILES['user_file']['name'][$i]);

//     if (!preg_match("/(gif|jpg|jpeg|png)$/",$_FILES['user_file']['name'][$i])) {
//         print "I asked for an image...";
//     } else {
//         if (is_uploaded_file($_FILES['user_file']['tmp_name'][$i])) {
//             if (move_uploaded_file($_FILES['user_file']['tmp_name'][$i], 
// 				$upload_file)) {
//                 /* Great success... */
//             } else {
//                 print $error_message[$_FILES['user_file']['error'][$i]];
//             }
//         } else {
//             print $error_message[$_FILES['user_file']['error'][$i]];
//         }    
//     }
// }

$fn = (isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false);
$name = (isset($_SERVER['HTTP_X_NAME']) ? $_SERVER['HTTP_X_NAME'] : false);
// $album = (isset($_SERVER['HTTP_X_ALBUM']) ? $_SERVER['HTTP_X_ALBUM'] : false);
if ($fn) {
    try {
        // AJAX call  
        file_put_contents(  
            'uploads/' . $fn,  
            file_get_contents('php://input')  
        );  
        echo '{"status": "success"}';
    } catch (Execption $e) {
        echo '{"status": "fail"}';
    }
    
} else {  
    // form submit  
    $files = $_FILES['filesuploads'];  
    foreach ($files['error'] as $id => $err) {  
        if ($err == UPLOAD_ERR_OK) {  
            $fn = $files['name'][$id];  
            move_uploaded_file(  
                $files['tmp_name'][$id],  
                'uploads/' . $fn  
            );  
            echo "<p>File $fn uploaded.</p>";  
        }  
    }  
}  