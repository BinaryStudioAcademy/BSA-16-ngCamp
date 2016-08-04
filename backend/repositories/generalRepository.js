var ObjectId = require('mongoose').Types.ObjectId;

function Repository() {

}

Repository.prototype.add = add;
Repository.prototype.addBatch = addBatch;
Repository.prototype.deleteById = deleteById;
Repository.prototype.getAll = getAll;
Repository.prototype.getById = getById;
Repository.prototype.setObjPropsById = setObjPropsById;

function add(data, callback) {
    var model = this.model;
    var newItem = new model(data);
    newItem.save(callback);
}

function addBatch(batchToInsert, callback) {
    var query = this.model.create(batchToInsert, callback);
}

function deleteById(id, callback) {
    var query = this.model.remove({
        _id: id
    });
    query.exec(callback);
}

function getAll(callback) {
    var query = this.model.find({});
    query.exec(callback);
}

function getById(id, callback) {
    var query = this.model.findOne({
        _id: id
    });
    query.exec(callback);
}

function setObjPropsById(id, setObj, callback) {
    var query = this.model.update({
        _id: id
    }, {
        $set: setObj
    });
    query.exec(callback);
}

module.exports = Repository;