const store = require('./store')
const requiredTags = ["productOrServiceType",
"price",
"petType",
"sales"
]
const normalizer = (string='') => string.toLowerCase() 

function addPublication (publication={}, user, file){
    return new Promise((resolve, reject)=>{
        if (!user || !publication)return reject('Incorect data in add')
        const file_url = file?`${process.env.HOST}/app/files/${file.filename}`:''
        const {title, description} = publication;
        let {tags} = publication;
        // Verify if tags has the correct propertys
        if(Object.keys(tags).filter(key => requiredTags.includes(key)).length !== 4){
            return reject("Tags de publicación inválidos")
        }else{
            tags.productOrServiceType = normalizer(tags.productOrServiceType);
            tags.petType = normalizer(tags.petType);
        }
        const fullPublication = {
            user,
            date: new Date(),
            file: file_url,
            title,
            description,
            tags
        }
        store.add(fullPublication)
        .then(x => resolve("Publicación realizada con éxito"))
        .catch(e => reject("Ocurrió un error al realizar la publicación, intenta más tarde"))
    })
}

function getPublications(filters){
    return new Promise((resolve, reject)=>{
        if(Object.keys(filters).filter(key => requiredTags.includes(key)).length === 4){
            filters.productOrServiceType = normalizer(filters.productOrServiceType);
            filters.petType = normalizer(filters.petType);
        }
        return resolve(store.list(filters))
    })
}

function updatePublication(id, pub){
    return new Promise(async(resolve, reject)=>{
        if(!id || !pub){
            return reject('Parámetros inválidos')
        }
        return store.update(id,pub)
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    })
}

function deletePublication (id){
    return new Promise((resolve, reject)=>{
        if(!id){
            return reject('No se encuentra id')
        }
        return store.remove(id)
            .then(resp => resolve(resp))
            .catch(err => reject(err))
    })
}

module.exports = {
    addPublication,
    getPublications,
    updatePublication,
    deletePublication
}