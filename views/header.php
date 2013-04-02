<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <title><?php echo html::specialchars($page_title.$site_name); ?></title>
  <?php if (!Kohana::config('settings.enable_timeline')) { ?>
    <style type="text/css">
      #graph{display:none;}
      #map{height:480px;}
    </style>
  <?php } ?>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <?php echo $header_block; ?>
  <?php
  // Action::header_scripts - Additional Inline Scripts from Plugins
  Event::run('ushahidi_action.header_scripts');
  ?>
  <script>
    function drawWindow(){
      console.log('drawing #map to '+(window.innerHeight-$('#header_nav').height()))
      $('#middle, #map, #panel-wrapper').css('height', window.innerHeight-$('#header_nav').height());
    }
    
    $(document).ready(function(){
      drawWindow();
    });
    
    $(window).resize(function(){
      drawWindow();
    })
  </script>
</head>

<?php
  // Add a class to the body tag according to the page URI

  // we're on the home page
  if (count($uri_segments) == 0)
  {
    $body_class = "page-main";
  }
  // 1st tier pages
  elseif (count($uri_segments) == 1)
  {
    $body_class = "page-".$uri_segments[0];
  }
  // 2nd tier pages... ie "/reports/submit"
  elseif (count($uri_segments) >= 2)
  {
    $body_class = "page-".$uri_segments[0]."-".$uri_segments[1];
  }
?>

<body id="page" class="<?php echo $body_class; ?>">

  <?php echo $header_nav; ?>

  <!-- wrapper -->
  <div class="rapidxwpr floatholder">

    <!-- main body -->
    <div id="middle">
      <!-- <div class="background layoutleft"> -->
        
        <!-- header -->
        <div id="header">

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

        </div>
        <!-- / header -->
            <!-- / header item for plugins -->
            <?php
                // Action::header_item - Additional items to be added by plugins
              Event::run('ushahidi_action.header_item');
            ?>

        <!-- mainmenu -->
        <!-- <div id="mainmenu" class="clearingfix">
          <ul>
            <?php nav::main_tabs($this_page); ?>
          </ul>

          <?php if ($allow_feed == 1) { ?>
          <div style="float:right;"><a href="<?php echo url::site(); ?>feed/"><img alt="<?php echo htmlentities(Kohana::lang('ui_main.rss'), ENT_QUOTES); ?>" src="<?php echo url::file_loc('img'); ?>media/img/icon-feed.png" style="vertical-align: middle;" border="0" /></a></div>
          <?php } ?>

        </div> -->
        <!-- / mainmenu -->
        
        <div id="panel-wrapper">
          <ul id="panel-tabs">
            <li value="submit">Submit</li>
            <li value="pins">Pins</li>
          </ul>
          <div id="submit-panel" class="panel">
            <!-- submit incident -->
            <?php echo $submit_btn; ?>
            <!-- / submit incident -->
          </div>
          <div id="pins-panel" class="panel">
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
          </div>
        </div>
