let obj = JSON.parse($response.body);

// 安全判断
if (obj && obj.component && obj.component.data && obj.component.data.data) {
    let data = obj.component.data.data;

    // 递归清理函数
    function cleanModules(modules) {
        if (!modules) return modules;

        for (let key in modules) {
            let m = modules[key];

            // 删除营销 / 红包 / 活动
            if (JSON.stringify(m).includes("AIPROMOTION") ||
                JSON.stringify(m).includes("red_packet") ||
                JSON.stringify(m).includes("yearEndPromotion") ||
                JSON.stringify(m).includes("promotionVenue")) {
                delete modules[key];
                continue;
            }

            // 删除众验 / 问答任务
            if (JSON.stringify(m).includes("publicverify") ||
                JSON.stringify(m).includes("这个门汽车可以进入吗")) {
                delete modules[key];
                continue;
            }

            // 删除所有带 ButtonFloat（营销按钮）的
            if (m.data && m.data.ButtonFloat) {
                delete modules[key];
            }

            // 递归子结构
            if (typeof m === "object") {
                cleanModules(m);
            }
        }
    }

    if (data.modules) {
        cleanModules(data.modules);
    }
}

// 输出
$done({ body: JSON.stringify(obj) });
