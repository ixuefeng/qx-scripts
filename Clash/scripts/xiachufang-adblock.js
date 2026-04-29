let obj = JSON.parse($response.body);

if (obj.content) {
  obj.content.enable_ad_sync_id = false;
  obj.content.wakeup_white_list = [];
  obj.content.splash_ad_req_time = 0;
  obj.content.splash_sdk_ad_req_time = 0;
  obj.content.splash_ad_lifecycle_interval = 999999;
  obj.content.homepage_waterfall_test_ad_pos = -1;
  obj.content.recipe_ad = {};
  obj.content.enable_quick_app_processing = false;
}

$done({ body: JSON.stringify(obj) });
