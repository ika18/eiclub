<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Menumodel extends CI_Model {

	function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }

    function get_all()
    {
        $query = $this->db->get('menu');
        return $query->result();
        // $data = $query->result();
    }
}