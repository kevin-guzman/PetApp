import {useState} from 'react'

let useForm = ({initialValues}) => {
    const [fields, setFields] = useState(initialValues)
    const addField = (name, value) =>{
        setFields({...fields, [name]: value})
    }
    const removeField = (name) =>{
        const filtered = fields.filter((x)=> x !== name )
        setFields(filtered)
    }
    function filter(exceptions=[]){
        let vec =[]
        let validated = true
        Object.keys(fields).forEach(value => {
            if(fields[value] === '' && !exceptions.includes(value)){
                vec.push(value)
                validated = false
            }
        })
        return {empty_fields:[], validated}
    }
    return{
        fields,
        addField,
        removeField,
        getInput: (name) => ({
            name,
            onChangeText : (text) =>{
                setFields({...fields, [name]:text})
            },
            value: fields[name]
        }),
        getPicker: (name) => ({
            name,
            onValueChange : (value) =>{
                setFields({...fields, [name]:value})
            }
        }),
        setForm : (name, value) => {
            setFields({...fields, [name]: value })
        },
        ValidateForm: (exceptions=[]) => {
            return filter(exceptions).validated
        },
        toFormData: (exceptions=[]) => {
            const formData = new FormData()
            Object.keys(fields).forEach(value => {
                !exceptions.includes(value) && formData.append(value, fields[value])
            })
            return formData
        }
    }
}

export default useForm