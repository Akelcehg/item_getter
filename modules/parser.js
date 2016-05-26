var Item = MODEL('item').schema;
var Http = require('./http.js');
var File = require('./file.js');
var ItemConfig = require('./itemConfig.js');
var FieldHandler = require('./fieldHandler.js');
var _async = require('async');

exports.install = function(options) {};

exports.uninstall = function(options) {};

exports.parse = function() {
var self = this;
    console.log("=>Parsing");
    async(function*() {

        var itemConfigFile = new ItemConfig('Autobazarlegkovie');
        var configFile = yield sync(itemConfigFile.getConfigFile)();

            var file = new File();
            file.getFile('./bazar.html',function(err,pageFile){
                
                console.log(self.getItemLinks(pageFile, configFile));
            });

        /*                parserModule.getPageContent(item['link'], function(err, page) {

                            if (err) {

                                self.json({ 'status': 'fail' });
                            } else self.json({ 'status': 'ok', 'links': parserModule.getItemLinks(page, configFile) });
                        });*/


    })();

    /*async(function*() {
        var items = new MODEL('items_list').schema();
        var file = new File();

        var activeItems = yield sync(items.getAllItems)();
        async(function*() {
            var pageFile = yield sync(file.getFile)('./bazar.html');
            async(function*() {
                var itemConfigFile = new ItemConfig(item[0]['config_file']);
                var configFile = yield sync(itemConfigFile.getConfigFile)();
            })();
        })();
        consoloe.log(getItemLinks(pageFile, configFile));



    })();*/


};

exports.getItemLinks = function(itemsListPage, configFile) {

    var listObject = configFile['items_list'];

    var fieldHandler = new FieldHandler(
        //listObject['parent_container'],
        listObject['link_item'],
        listObject['link_attribute'],
        itemsListPage
    );

    return fieldHandler.getFieldValue();

}


exports.parseItems = function(itemLinks) {

    //var item = new Item();  
    // var itemPage = new Http(itemLinks[0]);
    // itemPage.getPageContent(function(err, itemPageContent) {

    /*    var f = new File();
        f.saveFile('/', 'itempage.html', itemPageContent, function() {
            console.log('each done series');
        });*/

    // });

    var f = new File();
    f.getFile('./itempage.html', function(err, page) {



    });

    /*_async.eachSeries(itemLinks, function(itemLink, callback) {

        var itemPage = new Http(itemLink);
        itemPage.getPageContent(function(err,itemPageContent) {

            console.log('each done series');

            callback(err);

        });
    }, function(err) {
        if (err) {
            console.log('Error processing link ' + err);
        } else {
            console.log('All links processed');
        }
    });*/

    /*itemLinks.forEach(function(itemLink, i, arr) {
        async(function*() {
            var itemPage = new Http(itemLink);
            yield sync(itemPage.getPageContent)();
        })();
    })(function(err) {
        if (err) console.log(err);
    });*/



    //get item page
    //load item config file
    //process item page => modify item values
    //save item to db    

    //var user = new Users(self.body);
}

exports.getPageContent = function(itemLink, cb) {
    var page = new Http(itemLink);
    page.getPageContent(function(err, html) {
        cb(err, html);
    });
}

exports.parseSingleItem = function(itemLink, configFile) {
    return true;
}
