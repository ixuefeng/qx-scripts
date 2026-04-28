let obj = JSON.parse($response.body);

// 关键词（补贴广告特征）
const keywords = [
    "补贴",
    "五一",
    "出行补贴",
    "promotion",
    "subsidy",
    "AIPROMOTION",
    "yearEndPromotion"
];

// 判断是否命中广告
function isAdModule(m) {
    let str = JSON.stringify(m);

    // 命中关键词
    if (keywords.some(k => str.includes(k))) return true;

    // 命中营销结构
    if (m?.data?.ButtonFloat) return true;
    if (m?.data?.SubTitle?.text?.includes("福利")) return true;
    if (m?.data?.AssistInfo?.text?.includes("领取")) return true;

    return false;
}

// 递归清理
function clean(obj) {
    if (!obj || typeof obj !== "object") return;

    for (let key in obj) {
        let val = obj[key];

        if (typeof val === "object") {

            if (isAdModule(val)) {
                delete obj[key];
                continue;
            }

            clean(val);
        }
    }
}

// 执行清理
clean(obj);

// 输出
$done({ body: JSON.stringify(obj) });                continue;
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
