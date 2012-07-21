<?php if ( ! defined ( 'BASEPATH' ) ) exit ( 'No direct script access allowed.' );

class Index extends CI_Controller {
    public function __construct ( ) {
        parent::__construct ( );
        $this->load->library ( 'masterpage' );
    }

    public function index ( ) {
        $this->masterpage->setMasterPage('management/masterpage');

        // content_index is the view file to use.
        // content is the tag in the masterpage file we want to replace.
        $this->masterpage->addContentPage ('management/dashboard', 'content');

        // Show the masterpage to the world!
        $this->masterpage->show();
    }

    public function managemenu() {
        $this->masterpage->setMasterPage('management/masterpage');

        // content_index is the view file to use.
        // content is the tag in the masterpage file we want to replace.
        $this->masterpage->addContentPage ('management/managemenu', 'content');

        // Show the masterpage to the world!
        $this->masterpage->show();

        $query = $this->db->get('menu');
        $data = $query->result();

        // $this->load->model('Menumodel', 'menu');
        // $data = $this->menu->get_all();
        // echo '<pre>';
        // var_dump($data);
        // echo '</pre';
    }

    public function managephoto() {
        $this->masterpage->setMasterPage('management/masterpage');

        // content_index is the view file to use.
        // content is the tag in the masterpage file we want to replace.
        $this->masterpage->addContentPage ('management/managephoto', 'content');

        // Show the masterpage to the world!
        $this->masterpage->show();
    }
} 