<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require(APPPATH . '/libraries/REST_Controller.php');

Class Menuapi extends REST_Controller {

    function menus_get()
    {
        $this->load->model('Menumodel', 'menu');
        $data = $this->menu->get_all();  
        $this->response($data);  
    }

    // function menu_post()
    // {
    //     $data = array('post: '. $this->get('id'));  
    //     $this->response($data);  
    // }

    // function menu_put()
    // {
    //     $data = array('put: '. $this->get('id'));  
    //     $this->response($data);  
    // }

    // function menu_delete()
    // {
    //     $data = array('delete: '. $this->get('id'));  
    //     $this->response($data);  
    // }

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

    function menu_delete()
    {
        try {
            // $this->load->model('Menumodel', 'menu');
            // $model = json_decode($this->post('model'), true);
            // $id = $this->menu->insert($model['menu_name'], $model['menu_seq']);
            // $this->response(array(
            //     'menu_name' => $model['menu_name'],
            //     'menu_seq' => $model['menu_seq'],
            //     'menu_id' => $id
            // ));
            $this->response(array('delete' => $this->get('id')));
        } catch (Exception $e) {
            $this->response(array('status' => 'fail'));
        }
    }
}
