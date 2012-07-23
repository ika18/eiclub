<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require(APPPATH . '/libraries/REST_Controller.php');

Class Albumapi extends REST_Controller {

    function album_get()
    {
        $id = $this->get('id');

        if (empty($id)) {
            $this->load->model('Albummodel', 'menu');
            $data = $this->menu->get_all();  
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
                'menu_id' => $model['menu_id'],
                'album_name' => $model['album_name'],
                'album_id' => $id
            ));
        } catch (Exception $e) {
            $this->response(array('status' => 'fail'));
        }
    }

    function album_put()
    {
        try {
            $this->load->model('Albummodel', 'menu');
            $model = json_decode($this->put('model'), true);
            $this->menu->update($model);
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
            $this->load->model('Albummodel', 'menu');
            $this->menu->delete($id);
            $this->response(array('status' => 'ok', 'delete' => $id));  
        } catch (Exception $e) {
            $this->response(array('status' => 'fail'));
        }
    }
}
