var cheerio = require('cheerio');

function FieldHandler(node, nodeAttribute, page) {
    async(function*() {

        this.node = node;
        this.nodeAttribute = nodeAttribute;
        this.page = page;

    })();
}

FieldHandler.prototype.getFieldValues = function() {

}

FieldHandler.prototype.getFieldValue = function() {
    //вернуть все значения поля. ?массив
    return getNodesData();
}

function getNodesData() {

    var self = this;
    var $ = cheerio.load(this.page, {
        normalizeWhitespace: true
    });

    var nodeData = [];
    var nodesArray = this.node.split(' ');
    var parentNode = nodesArray[0];

    nodesArray.shift();
    var childrenNodes = nodesArray;

    $(parentNode).each(function(i, elem) {
        var parent = $(this);
        childrenNodes.forEach(function(item, i, arr) {
            parent = parent.children(item)
        });
        nodeData.push(parent.attr(self.nodeAttribute));
    });
    return nodeData;
}

module.exports = FieldHandler;
