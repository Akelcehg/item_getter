var Item = MODEL('item').schema;
var Http = require('./http.js');
var File = require('./file.js');
var ItemConfig = require('./itemConfig.js');
var FieldHandler = require('./fieldHandler.js');
var _async = require('async');

exports.install = function(options) {};

exports.uninstall = function(options) {};

exports.parse = function() {

    console.log("=>Parsing");

    async(function*() {

        /*var link = 'https://auto.ria.com/search/#countpage=10&power_name=1&s_yers[0]=0&po_yers[0]=0&currency=1&engineVolumeFrom=&engineVolumeTo=';

        var page = new Http(link);
*/

        /*
            1)выкачать просто файлы для работы, что бы не ждать пол жизни интернета
            2)поочередно каждый прогнать через парсер из базы выбрав и доставл фалй. а рядом сделать асинхр ХТТП запрос
        */

        //file.getFile('/pagename.html', function(err, pageContent) {

        var items = new MODEL('items_list').schema();
        var file = new File();

        var activeItems = yield sync(items.getAllItems)();

        //items.getAllItems(function(err,items) {


        //_async.each(activeItems, function(item, callback) {
        activeItems.forEach(function(item, i, arr) {

            //Достал все сайты из базы и теперь их надо прогнать через ХТТП
            //HTTP GET -> parse links -> parse items
            //пока читать с файла

            //это потом меняем на HTTP

            async(function*() {

                var pageFile = yield sync(file.getFile)('./pagename.html');

                var itemConfigFile = new ItemConfig(item['name']);
                var configFile = yield sync(itemConfigFile.getConfigFile)();

                parseItems(getItemLinks(pageFile, configFile))

                //callback();
                //file.getFile('/pagename.html', function(err, pageContent) {

                //parsePageContent(pageFile, item);
                //var itemConfigFile = yield sync(file.getItemConfigFile)(item['name']);
                //console.log(getItemLinks(pageFile));


                //});

            })();
        });

        /* }, function(err) {
             if (err) {
                 console.log(err);
             } else {
                 console.log('Done');
             }
         });*/

        //        });

        //});

        /*page.getPageContent(function(err,html){
            if (err) console.log (err);console.log ("page finished");
            file.saveFile('/','pagename.html',html,function (err) {
                if (err) console.log (err);
            });
        });*/

    })(function(err) {
        if (err) console.log(err);
    });

};

function getItemLinks(itemsListPage, configFile) {

    var listObject = configFile['items_list'];

    var fieldHandler = new FieldHandler(
        //listObject['parent_container'],
        listObject['link_item'],
        listObject['link_attribute'],
        itemsListPage
    );

    return fieldHandler.getFieldValue();

}


function parseItems(itemLinks) {

    //var item = new Item();  
    // var itemPage = new Http(itemLinks[0]);
    // itemPage.getPageContent(function(err, itemPageContent) {

/*    var f = new File();
    f.saveFile('/', 'itempage.html', itemPageContent, function() {
        console.log('each done series');
    });*/

    // });

    var f = new File();
    f.getFile('./itempage.html',function(err,page){

        
        
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
