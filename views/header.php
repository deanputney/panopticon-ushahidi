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

  // Main page only: Include these styles/scripts
  if (count($uri_segments) == 0)
  {
?>

<link type="text/css" rel="stylesheet" href="<?php echo url::site();?>themes/panopticon/main/_main.css" />
<script type="text/javascript" src="<?php echo url::site();?>themes/panopticon/main/main.js"></script>
<?php
  }

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
</head>
<body id="page" class="<?php echo $body_class; ?>">
<?php 
  $header_file = (count($uri_segments) == 0) ? 'main' : 'page';
  if(isset($_GET['panel'])) $header_file = 'panel';
  include_once('partials/header-' . $header_file . '.php');
?>
