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


        _async.each(activeItems, function(item, callback) {

            //Достал все сайты из базы и теперь их надо прогнать через ХТТП
            //HTTP GET -> parse links -> parse items
            //пока читать с файла

            //это потом меняем на HTTP

            async(function*() {

                var pageFile = yield sync(file.getFile)('./pagename.html');

                var itemConfigFile = new ItemConfig(item['name']);
                var configFile = yield sync(itemConfigFile.getConfigFile)();

                console.log(getItemLinks(pageFile, configFile));
                
                callback();
                //file.getFile('/pagename.html', function(err, pageContent) {

                //parsePageContent(pageFile, item);
                //var itemConfigFile = yield sync(file.getItemConfigFile)(item['name']);
                //console.log(getItemLinks(pageFile));


                //});

            })();

        }, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Done');
            }
        });

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

function getItemLinks (itemsListPage, configFile) {

    var listObject = configFile['items_list'];

    var fieldHandler = new FieldHandler(
        //listObject['parent_container'],
        listObject['link_item'],
        listObject['link_attribute'],
        itemsListPage
    );

    return fieldHandler.getFieldValue();

}

function parsePageContent(pageContent, itemData) {

    console.log('Parse block');

    /*    var $ = cheerio.load(pageContent, {
            normalizeWhitespace: true
                //decodeEntities: true
        });
    */
    /*var ItemsList = MODEL('items_list').schema;
    var items = new ItemsList();

    items.getAllItems(function(items) {
        async.each(items, function(item, callback) {
            console.log(item);
            callback();
        }, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Done');
            }
        });

    });*/

    /*        $('div.ticket-item.paid').each(function (i, elem) {
         console.log($(this)
         .children('div.m_head-ticket')
         .children('div.box-head')
         .children('div.item.head-ticket')
         .children('div.ticket-title')
         .children('a.address')
         .attr('title'));
         console.log("--------------------------------");
         });*/

    loadItemConfigFile(itemData['name'], function(err, content) {
        /*
            1)считал файл конфигов
            2)получил ссылки
            3)отправил на парсинг ссылок в параллельно режиме
            4)сохранение JSON обхектов            
        */
        console.log(content);
    });

}

/*function loadItemConfigFile(name, cb) {
    var configFile = new File();

    configFile.getFile('items_config/' + name + '.json', function(err, content) {
        cb(err, JSON.parse(content));
    });
}*/

function custom(a, b, callback) {
    // callback(error, result);
    callback(null, a + b);
};
