<div id="mapFilters" class="clearingfix">
  <!-- category filters -->
  <div class="cat-filters clearingfix">
  	<strong>
  		<?php echo Kohana::lang('ui_main.category_filter');?>
  		<span>
  			[<a href="javascript:toggleLayer('category_switch_link', 'category_switch')" id="category_switch_link">
  				<?php echo Kohana::lang('ui_main.hide'); ?>
  			</a>]
  		</span>
  	</strong>
  </div>

  <ul id="category_switch" class="category-filters">
  	<?php
  	$color_css = 'class="swatch" style="background-color:#'.$default_map_all.'"';
  	$all_cat_image = '';
  	if ($default_map_all_icon != NULL)
  	{
  		$all_cat_image = html::image(array(
  			'src'=>$default_map_all_icon,
  			'style'=>'float:left;padding-right:5px;'
  		));
  		$color_css = '';
  	}
  	?>
  	<li>
  		<a class="active" id="cat_0" href="#">
  			<span <?php echo $color_css; ?>><?php echo $all_cat_image; ?></span>
  			<span class="category-title"><?php echo Kohana::lang('ui_main.all_categories');?></span>
  		</a>
  	</li>
  	<?php
  		foreach ($categories as $category => $category_info)
  		{
  			$category_title = htmlentities($category_info[0], ENT_QUOTES, "UTF-8");
  			$category_color = $category_info[1];
  			$category_image = ($category_info[2] != NULL)
  			    ? url::convert_uploaded_to_abs($category_info[2])
  			    : NULL;
  			$category_description = htmlentities(Category_Lang_Model::category_description($category), ENT_QUOTES, "UTF-8");

  			$color_css = 'class="swatch" style="background-color:#'.$category_color.'"';
  			if ($category_info[2] != NULL)
  			{
  				$category_image = html::image(array(
  					'src'=>$category_image,
  					'style'=>'float:left;padding-right:5px;'
  					));
  				$color_css = '';
  			}

  			echo '<li>'
  			    . '<a href="#" id="cat_'. $category .'" title="'.$category_description.'">'
  			    . '<span '.$color_css.'>'.$category_image.'</span>'
  			    . '<span class="category-title">'.$category_title.'</span>'
  			    . '</a>';

  			// Get Children
  			echo '<div class="hide" id="child_'. $category .'">';
  			if (sizeof($category_info[3]) != 0)
  			{
  				echo '<ul>';
  				foreach ($category_info[3] as $child => $child_info)
  				{
  					$child_title = htmlentities($child_info[0], ENT_QUOTES, "UTF-8");
  					$child_color = $child_info[1];
  					$child_image = ($child_info[2] != NULL)
  					    ? url::convert_uploaded_to_abs($child_info[2])
  					    : NULL;
  					$child_description = htmlentities(Category_Lang_Model::category_description($child), ENT_QUOTES, "UTF-8");
					
  					$color_css = 'class="swatch" style="background-color:#'.$child_color.'"';
  					if ($child_info[2] != NULL)
  					{
  						$child_image = html::image(array(
  							'src' => $child_image,
  							'style' => 'float:left;padding-right:5px;'
  						));

  						$color_css = '';
  					}

  					echo '<li style="padding-left:20px;">'
  					    . '<a href="#" id="cat_'. $child .'" title="'.$child_description.'">'
  					    . '<span '.$color_css.'>'.$child_image.'</span>'
  					    . '<span class="category-title">'.$child_title.'</span>'
  					    . '</a>'
  					    . '</li>';
  				}
  				echo '</ul>';
  			}
  			echo '</div></li>';
  		}
  	?>
  </ul>
  <!-- / category filters -->

  <?php if ($layers): ?>
  	<!-- Layers (KML/KMZ) -->
  	<div class="cat-filters clearingfix" style="margin-top:20px;">
  		<strong><?php echo Kohana::lang('ui_main.layers_filter');?> 
  			<span>
  				[<a href="javascript:toggleLayer('kml_switch_link', 'kml_switch')" id="kml_switch_link">
  					<?php echo Kohana::lang('ui_main.hide'); ?>
  				</a>]
  			</span>
  		</strong>
  	</div>
  	<ul id="kml_switch" class="category-filters">
  	<?php
  		foreach ($layers as $layer => $layer_info)
  		{
  			$layer_name = $layer_info[0];
  			$layer_color = $layer_info[1];
  			$layer_url = $layer_info[2];
  			$layer_file = $layer_info[3];

  			$layer_link = ( ! $layer_url)
  			    ? url::base().Kohana::config('upload.relative_directory').'/'.$layer_file
  			    : $layer_url;
			
  			echo '<li>'
  			    . '<a href="#" id="layer_'. $layer .'">'
  			    . '<span class="swatch" style="background-color:#'.$layer_color.'"></span>'
  			    . '<span class="layer-name">'.$layer_name.'</span>'
  			    . '</a>'
  			    . '</li>';
  		}
  	?>
  	</ul>
  	<!-- /Layers -->
  <?php endif; ?>

</div>

    
    <?php
    // Map and Timeline Blocks
    echo $div_map;
    ?>
    <div id="mapControls">
      <?php echo $div_timeline; ?>
    </div>
  
  <div id="reportMap" class="report_map"></div>

<?php include('intro.php'); ?>