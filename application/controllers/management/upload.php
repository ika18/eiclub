<?php if ( ! defined ( 'BASEPATH' ) ) exit ( 'No direct script access allowed.' );

class Upload extends CI_Controller {
    var $uploadFolder = "assets/images/photos/";

    public function __construct ( ) {
        parent::__construct ( );
        $this->load->library ( 'masterpage' );
    }

    public function uploadphoto ( ) {
        $headers = getallheaders();
        $headers = array_change_key_case($headers, CASE_UPPER);

        $fn = (isset($headers['X-FILENAME']) ? $headers['X-FILENAME'] : false);
        // $name = (isset($headers['X-NAME']) ? $headers['X-NAME'] : false);
        // $album = (isset($headers['X-ALBUM']) ? $headers['X-ALBUM'] : false);

        if ($fn) {  
            
            try {
                file_put_contents(  
                    "assets/images/photos/" . $fn, 
                    file_get_contents('php://input')  
                );  
                echo '{"status": "success"}';
                // echo $name;
            } catch (Exception $e) {
                echo '{"status": "fail", "message": "An exception occurs!"}';
            }
            
        } else {
            echo '{"status": "fail", "message": "Didn\'t receive file!"}';
        }
    }
} 