<div class="row-fluid">
	<h2>Manage menu</h2>

	<table id="menu-table" class="table editable">
		<colgroup>
			<col width="10%">
			<col width="50%">
			<col width="40%">
		</colgroup>
		<thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Operate</th>
			</tr>
		</thead>
		<tbody>
			
		</tbody>
	</table>
</div>

<div class="row-fluid">
	<h2>Add new menu</h2>
	<form action="#" class="form-horizontal" id="add-menu">
		<fieldset>
			<div class="control-group">
				<label for="menu_name" class="control-label">Menu Name</label>
				<div class="controls">
					<input type="text" class="input-xlarge" id="menu_name" />
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

<script type="text/template" id="menu-template">
	<td>{{menu_seq}}</td>
	<td>
		<div class="view">{{menu_name}}</div>
		<div class="edit">
			<input type="text" name="menu_name" class="" />
			<input type="hidden" name="menu_id" value="{{menu_id}}">
		</div>
	</td>
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

<script src="<?php echo site_url('assets/js/libs/mustache/mustache.js'); ?>"></script>
<script src="<?php echo site_url('assets/js/libs/underscore/underscore-min.js'); ?>"></script>
<script src="<?php echo site_url('assets/js/libs/backbone/backbone-min.js'); ?>"></script>
<script src="<?php echo site_url('assets/js/manageMenu.js'); ?>"></script>