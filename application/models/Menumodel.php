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
        $data = $query->result();
        // $data = $query->result();

        return $data;
    }

    function insert($menu_name, $menu_seq) 
    {
        $this->db->insert('menu', array(
            'menu_name' => $menu_name,
            'menu_seq' => $menu_seq
        ));

        return $this->db->insert_id();
    }

    function delete($menu_id) 
    {
        $this->db->delete('menu', array('menu_id' => $menu_id));
    }
}