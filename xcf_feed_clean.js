let obj = JSON.parse($response.body);

if (obj.multiplex_cells) {
  obj.multiplex_cells = obj.multiplex_cells.filter(item => {
    let cell = item.recommendation_cell;
    if (!cell) return true;

    // 过滤广告
    if (cell.tracking) {
      let isAd =
        cell.tracking.xcf_click_urls?.some(u => u.includes("type=ad")) ||
        cell.tracking.xcf_expose_urls?.some(u => u.includes("type=ad")) ||
        cell.label === "活动" ||
        cell.url?.includes("/page/s/");

      return !isAd;
    }

    return true;
  });
}

$done({ body: JSON.stringify(obj) });
