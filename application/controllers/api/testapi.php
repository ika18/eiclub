<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require(APPPATH . '/libraries/REST_Controller.php');

Class Testapi extends REST_Controller {

    function user_get()
    {
        $data = array('get: '. $this->get('id'));  
        $this->response($data);  
    }

    function user_post()
    {
        $data = array('post: '. $this->get('id'));  
        $this->response($data);  
    }

    function user_put()
    {
        $data = array('returned: '. $this->get('id'));  
        $this->response($data);  
    }

    function user_delete()
    {
        // transfer data using post method
        $data = array('returned: '. $this->delete('id'));
        // transfer data using get method
        $data = array('returned: '. $this->get('id'));  
        $this->response($data);  
    }
}
