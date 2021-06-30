const Model = require('./model')

function addUser(user){
    const _user = new Model(user)
    return _user.save()
}

function list(){
    return Model.find({}, {__v:0, password:0, token:0,})
}

function getUser(email){
    return Model.findOne({email})
}

function getUserById(id){
    return Model.findOne({_id:id}, {password:0, __v:0})
}

function updateToken(id, token){
    return Model.findOneAndUpdate({_id:id}, {token}, {returnOriginal:false, projection:{password:0, __v:0}})
}

function getUsersByName(name) {
    return Model.find({name:{$regex: name}}, {password:0, token:0})
}

module.exports ={
    add: addUser,
    list,
    getUser,
    getUserById,
    updateToken,
    getUsersByName
}