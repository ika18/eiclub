<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require(APPPATH . '/libraries/REST_Controller.php');

Class Albumapi extends REST_Controller {

    function album_get()
    {
        $id = $this->get('id');
        $this->load->model('Albummodel', 'menu');

        if (empty($id)) {
            $data = $this->menu->get_all();  
            if (empty($data)) {
                header('HTTP/1.1 204 No Content');
            } else {
                $this->response($data);
            }
        } else {
            $data = $this->menu->get_where($id);
            $this->response($data);
        } 
    }

    function album_post() 
    {
        try {
            $this->load->model('Albummodel', 'album');
            $album = json_decode($this->post('model'), true);
            $id = $this->album->insert($album);
            $this->response(array(
                'menu_id' => $album['menu_id'],
                'album_name' => $album['album_name'],
                'album_id' => $id,
            ));
        } catch (Exception $e) {
            $this->response(array('status' => 'fail'));
        }
    }

    function album_put()
    {
        try {
            $this->load->model('Albummodel', 'album');
            $model = json_decode($this->put('model'), true);
            $this->album->update($model);
            $this->response(array(
                'status' => 'ok'
            ));
        } catch (Exception $e) {
            $this->response(array('status' => 'fail'));
        }
    }

    function album_delete()
    {
        try {
            $id = $this->get('id');
            $this->load->model('Albummodel', 'album');
            $this->album->delete($id);
            $this->response(array('status' => 'ok', 'delete' => $id));  
        } catch (Exception $e) {
            $this->response(array('status' => 'fail'));
        }
    }
}
