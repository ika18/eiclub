<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require(APPPATH . '/libraries/REST_Controller.php');

Class Menuapi extends REST_Controller {

    function menu_get()
    {
        $id = $this->get('id');

        if (empty($id)) {
            $this->load->model('Menumodel', 'menu');
            $data = $this->menu->get_all();  
            $this->response($data);  
        }
        
    }

    function menu_post() 
    {
        try {
            $this->load->model('Menumodel', 'menu');
            $model = json_decode($this->post('model'), true);
            $id = $this->menu->insert($model['menu_name'], $model['menu_seq']);
            $this->response(array(
                'menu_name' => $model['menu_name'],
                'menu_seq' => $model['menu_seq'],
                'menu_id' => $id
            ));
        } catch (Exception $e) {
            $this->response(array('status' => 'fail'));
        }
    }

    function menu_put()
    {
        try {
            $this->load->model('Menumodel', 'menu');
            $model = json_decode($this->put('model'), true);
            $this->menu->update($model);
            $this->response(array(
                'status' => 'ok'
            ));
        } catch (Exception $e) {
            $this->response(array('status' => 'fail'));
        }
    }

    function menu_delete()
    {
        try {
            $id = $this->get('id');
            $this->load->model('Menumodel', 'menu');
            $this->menu->delete($id);
            $this->response(array('status' => 'ok', 'delete' => $id));  
        } catch (Exception $e) {
            $this->response(array('status' => 'fail'));
        }
    }
}
