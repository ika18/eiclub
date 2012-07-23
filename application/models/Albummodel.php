<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Albummodel extends CI_Model {

	function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }

    function get_all()
    {
        $query = $this->db->get('album');
        $data = $query->result();
        // $data = $query->result();

        return $data;
    }

    function insert($model) 
    {
        $this->db->insert('album', array(
            'album_name' => $model['album_name'],
            'menu_id' => $model['menu_id']
        ));

        return $this->db->insert_id();
    }

    function delete($menu_id) 
    {
        $this->db->delete('album', array('menu_id' => $menu_id));
    }

    function update($model)
    {
        $this->db->where('menu_id', $model['menu_id']);
        $this->db->update('album', array(
            'menu_name' => $model['menu_name'],
            'menu_seq' => $model['menu_seq'],
        ));
    }
}