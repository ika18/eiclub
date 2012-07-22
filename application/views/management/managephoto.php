<div class="hero-unit dropArea">
    <h2>Drag photos here!</h2>
    <a href="#uploadModal" class="btn" data-toggle="modal">Upload modal</a>
</div>

<div class="row-fluid">
    <p>
        <select id="menuList" class="span2">
            <option value="">All</option>
            <option value="1">Album 1</option>
            <option value="2">Album 2</option>
        </select>

        <select class="span2" id="albumList">
            <option value="">All</option>
            <option value="1">Album 1</option>
            <option value="2">Album 2</option>
        </select>
    </p>

    <ul class="thumbnails">
        <li class="span2">
            <div class="thumbnail">
                <img src="http://placehold.it/260x180" alt="">
                <div class="caption">
                    <label for="prev-thumb0">Photo name</label>
                    <input type="text" placeholder="Chrysanthemum" name="prev-thumb0" id="prev-thumb0" class="input-small">
                    <p>
                        <a href="#" class="btn">Delete</a>
                    </p>
                    <p>
                        <a href="#" class="btn btn-primary">Rename</a>
                    </p>
                </div>
            </div>
        </li>

        <li class="span2">
            <div class="thumbnail">
                <img src="http://placehold.it/260x180" alt="">
                <div class="caption">
                    <label for="prev-thumb0">Photo name</label>
                    <input type="text" placeholder="Chrysanthemum" name="prev-thumb0" id="prev-thumb0" class="input-small">
                    <p>
                        <a href="#" class="btn">Delete</a>
                    </p>
                    <p>
                        <a href="#" class="btn btn-primary">Rename</a>
                    </p>
                </div>
            </div>
        </li>

    </ul>
</div>

<!-- file upload modal start -->
<div class="modal fade" id="uploadModal">
    <?php echo form_open('management/upload/uploadphoto'); ?>
        <div class="modal-header">
          <a class="close" data-dismiss="modal">×</a>
          <h3>Photo preview</h3>
          <div class="row">
            <select name="album" id="album">
              <option value="">Add to an album</option>
              <option value="1">Album 1</option>
              <option value="2">Album 2</option>
            </select>
          </div>
        </div>
        <div class="modal-body">
          <ul class="thumbnails">
            <!-- dynamic append thumbnail -->
          </ul>
        </div>
        <div class="modal-footer">
          <a href="#" class="btn">Abandon</a>
          <a href="#" class="btn btn-primary" id="uploadBtn">Upload</a>
        </div>
    <?php form_close(); ?>
</div>
<!-- file upload modal end -->

<!-- thumbnail template start -->
<script type="text/template" id="thumbnail-template">
  <li class="span2">
    <div class="thumbnail">
      <img src="" alt="" width="160" height="120" data-name="" />
      <div class="caption">
        <label for="">Photo name</label>
        <input type="text" placeholder="" name="" id="" class="input-small" />
        <p>
          <a href="#" class="btn">Cancel</a>
        </p>
      </div>
    </div>
  </li>
</script>
<!-- thumbnail template end -->

<script src="<?php echo site_url('assets/js/bootstrap/bootstrap-transition.js'); ?>"></script>
<script src="<?php echo site_url('assets/js/bootstrap/bootstrap-modal.js'); ?>"></script>
<script src="<?php echo site_url('assets/js/dndUpload.js'); ?>"></script>
<script src="<?php echo site_url('assets/js/photoUpload.js'); ?>"></script>