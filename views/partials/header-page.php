<?php echo $header_nav; ?>

<!-- wrapper -->
<div class="rapidxwpr floatholder">

	<!-- header -->
	<div id="header">

		<!-- searchbox -->
		<div id="searchbox">

			<!-- languages -->
			<?php echo $languages;?>
			<!-- / languages -->

			<!-- searchform -->
			<?php echo $search; ?>
			<!-- / searchform -->

		</div>
		<!-- / searchbox -->

		<!-- logo -->
		<?php if ($banner == NULL): ?>
		<div id="logo">
			<h1><a href="<?php echo url::site();?>"><?php echo $site_name; ?></a></h1>
			<span><?php echo $site_tagline; ?></span>
		</div>
		<?php else: ?>
		<a href="<?php echo url::site();?>"><img src="<?php echo $banner; ?>" alt="<?php echo $site_name; ?>" /></a>
		<?php endif; ?>
		<!-- / logo -->

		<!-- submit incident -->
		<?php echo $submit_btn; ?>
		<!-- / submit incident -->

	</div>
	<!-- / header -->
      <!-- / header item for plugins -->
      <?php
          // Action::header_item - Additional items to be added by plugins
        Event::run('ushahidi_action.header_item');
      ?>

	<!-- main body -->
	<div id="middle">
		<div class="background layoutleft">

			<!-- mainmenu -->
			<div id="mainmenu" class="clearingfix">
				<ul>
					<?php nav::main_tabs($this_page); ?>
				</ul>

				<?php if ($allow_feed == 1) { ?>
				<div style="float:right;"><a href="<?php echo url::site(); ?>feed/"><img alt="<?php echo htmlentities(Kohana::lang('ui_main.rss'), ENT_QUOTES); ?>" src="<?php echo url::file_loc('img'); ?>media/img/icon-feed.png" style="vertical-align: middle;" border="0" /></a></div>
				<?php } ?>

			</div>
			<!-- / mainmenu -->

