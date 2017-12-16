const Debug = require("keeling-js/lib/debug");
const Hot = require("../api/hot");
const Manga = require("../api/manga");

module.exports = {
    name: "refresh latest hot manga",
    schedule: "0 * * * *",
    task: function () {
        Debug.log("Refreshing latest hot mangas");
        Hot.refreshLatest(function (ids) {
            Manga.updateAll(ids, function () {
                Debug.log("Successfully fetched " + ids.length + " mangas");
            }, function (err) {
                Debug.error("Error fetching manga info " + err);
            });
        }, function (err) {
            Debug.error("Error refreshing hot manga " + err);
        });
    }
};