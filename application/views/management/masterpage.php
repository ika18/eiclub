<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<?php echo link_tag('assets/css/bootstrap.css');?>
	<?php echo link_tag('assets/css/bootstrap-responsive.css');?>
	<?php echo link_tag('assets/css/management.css');?>

    <script src="<?php echo site_url('assets/js/libs/jquery/jquery-1.7.1.min.js'); ?>"></script>
  
	<title>EI Club - Management</title>
</head>

<body>
	<div class="navbar navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container-fluid">
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>
                <a class="brand" href="#">EI Club</a>
                <div class="nav-collapse">
                    <ul class="nav">
                        <li class="active"><a href="#">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <p class="navbar-text pull-right">Logged in as <a href="#">username</a></p>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
    	<div class="row-fluid">
    		<div class="span3">
    			<div class="well sidebar-nav">
    				<ul class="nav nav-list">
	    				<li class="nav-header">Side Nav</li>
	    				<li><a href="<?php echo site_url('management/index/managemenu'); ?>">Menu Management</a></li>
                        <li><a href="<?php echo site_url('management/index/managealbum'); ?>">Menu Album</a></li>
                        <li class="nav-header">Photo</li>
                        <li><a href="<?php echo site_url('management/index/managephoto'); ?>">Photo Management</a></li>
	    			</ul>
    			</div>
    			
    		</div>

    		<div class="span9">
    			<mp:Content />
    		</div>
    	</div>   	
    </div>
	
</body>
</html>