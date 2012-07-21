<?php
$headers = getallheaders();
$headers = array_change_key_case($headers, CASE_UPPER);
$fn = (isset($headers['X-FILENAME']) ? $headers['X-FILENAME'] : false);
$name = (isset($headers['X-NAME']) ? $headers['X-NAME'] : false);
// $album = (isset($headers['X-ALBUM']) ? $headers['X-ALBUM'] : false);
if ($fn) {
    // echo $fn;
    try {
        // AJAX call  
        file_put_contents(  
            'uploads/' . $fn,  
            file_get_contents('php://input')  
        );  
        echo '{"status": "success"}';
    } catch (Execption $e) {
        echo '{"status": "fail", "message": "An exception occured!"}';
    }
} else {
    echo '{"status": "fail", "message": "Didn\'t recieve file!"}';
}