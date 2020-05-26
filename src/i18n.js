import i18n from "i18next";

const resources = require("./locals/zh-CN.json")

i18n
    .init({
        resources,
        lng: "zh-CN",

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;