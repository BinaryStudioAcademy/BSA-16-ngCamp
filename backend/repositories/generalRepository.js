var ObjectId = require('mongoose').Types.ObjectId;

function Repository() {

}

Repository.prototype.add = add;
Repository.prototype.addBatch = addBatch;
Repository.prototype.deleteById = deleteById;
Repository.prototype.getAll = getAll;
Repository.prototype.getById = getById;
Repository.prototype.setObjPropsById = setObjPropsById;
Repository.prototype.findByObject = findByObject;

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
        _id: ObjectId(id)
    }, {
        $set: setObj
    });
    query.exec(callback);
    console.log(setObj);
}

function findByObject(obj, populate, select, callback) {
    var query = this.model.find(obj, select).populate(populate);
    query.exec(callback);
}

module.exports = Repository;
