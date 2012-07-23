<div class="row-fluid">
	<h2>Manage Album</h2>

	<div class="tabbable">
		<ul class="nav nav-tabs" id="album-tab">
			<li class="active">
				<a href="#" data-toggle="tab">All</a>
			</li>
		</ul>

		<div class="" id="album-content">
			<table class="album-table table table-striped editable">
				<thead>
					<tr>
						<th width="10%">#</th>
						<th width="60%">Album Name</th>
						<th width="30%">Operate</th>
					</tr>
				</thead>
				<tbody class="tab-content">
				</tbody>
			</table>
		</div>
	</div>

</div>

<div class="row-fluid">
	<h2>Add New Album</h2>
	<form action="#" class="form-horizontal" id="add-album">
		<fieldset>
			<div class="control-group">
				<label for="menu_name" class="control-label">Select A Menu</label>
				<div class="controls">
					<select id="menu_name" class="span3">
						<option value="">Please select</option>
					</select>
					<span class="help-inline"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="album_name" class="control-label">Album Name</label>
				<div class="controls">
					<input type="text" class="input-xlarge" id="album_name" />
					<span class="help-inline"></span>
				</div>
			</div>
			<div class="form-actions">
				<input type="submit" class="btn btn-primary" value="Add" />
				<input type="reset" class="btn" value="Reset" />
			</div>
		</fieldset>
	</form>
</div>

<script type="text/template" id="tab-template">
	<a href="" data-toggle="tab">{{menu_name}}</a>
</script>

<script type="text/template" id="menu-select-template">
	{{menu_name}}
</script>

<script type="text/template" id="album-template">
	<td></td>
	<td>{{album_name}}</td>
	<td>
		<div class="view">
			<a href="#" class="btn btn-primary editBtn">Edit</a>
			<a href="#" class="btn btn-danger removeBtn">Remove</a>
		</div>
		<div class="edit">
			<a href="#" class="btn btn-primary updateBten">Update</a>
			<a href="#" class="btn closeBtn">Abandon</a>
		</div>
	</td>
</script>

<script src="<?php echo site_url('assets/js/bootstrap/bootstrap-tab.js'); ?>"></script>
<script src="<?php echo site_url('assets/js/libs/mustache/mustache.js'); ?>"></script>
<script src="<?php echo site_url('assets/js/libs/underscore/underscore-min.js'); ?>"></script>
<script src="<?php echo site_url('assets/js/libs/backbone/backbone-min.js'); ?>"></script>
<script src="<?php echo site_url('assets/js/manageAlbum.js'); ?>"></script>