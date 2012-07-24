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
        if (!empty($data)) {
            return $data;
        } else {
            return '';
        }
    }

    function get_where($id)
    {
        $query = $this->db->get_where('album', array('menu_id' => $id));
        $data = $query->result();

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

    function delete($album_id) 
    {
        $this->db->delete('album', array('album_id' => $album_id));
    }

    function update($model)
    {
        $this->db->where('album_id', $model['album_id']);
        $this->db->update('album', array(
            'album_name' => $model['album_name'],
            'menu_id' => $model['menu_id'],
        ));
    }
}