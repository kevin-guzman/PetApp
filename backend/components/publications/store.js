const Model = require('./model')

function addPublication (publication){
    const _Publication = new Model(publication)
    return _Publication.save()
}

function getPublications(filters={}){
    return new Promise((resolve, reject)=>{
        const {productOrServiceType, price, petType, sales} = filters;
        const queryByName={
            productOrServiceType: productOrServiceType,
            sales:{$gte: sales},
            price:{$lte: price},
            petType: petType
        };
        if(Object.keys(filters).length >0){
            Object.keys(filters).map(key =>{
                if(filters[key]){
                    filters={...filters, ['tags.'+key]: queryByName[key]}
                }
                delete filters[key]
            })
        }
        Model.find(filters, {__v:0})
            .lean()
            .populate({path:'user', select:'-__v -token -password'})
            .exec((error, populated)=>{
                if (error) reject(error)
                resolve(populated)
            })
    })
}

async function updatePublication(id,publication){
    const db_publication = await Model.findOne({_id:id})
    const {title, description} = publication;
    db_publication.title = title
    db_publication.description = description
    return await db_publication.save()
}

function removePublication(id){
    return  Model.deleteOne({_id:id})
}

module.exports = {
    add: addPublication,
    list: getPublications,
    update: updatePublication,
    remove: removePublication
}