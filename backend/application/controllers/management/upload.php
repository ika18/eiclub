<?php if ( ! defined ( 'BASEPATH' ) ) exit ( 'No direct script access allowed.' );

class Upload extends CI_Controller {
    public function __construct ( ) {
        parent::__construct ( );
        $this->load->library ( 'masterpage' );
    }

    public function uploadphoto ( ) {
        $fn = (isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false);
        // $name = (isset($_SERVER['HTTP_X_NAME']) ? $_SERVER['HTTP_X_NAME'] : false);
        // $album = (isset($_SERVER['HTTP_X_ALBUM']) ? $_SERVER['HTTP_X_ALBUM'] : false);

        if ($fn) {  
            
            try {
                file_put_contents(  
                    // base_url("assets/images/photos") . "/" . $fn,
                    "assets/images/photos/" . $fn, 
                    file_get_contents('php://input')  
                );  
                echo '{"status": "success"}';
                // echo $name;
            } catch (Exception $e) {
                echo '{"status": "fail"}';
            }
            
        }

        // print("<pre>");
        // print_r($_SERVER);
        // print("</pre>");
    }
} 