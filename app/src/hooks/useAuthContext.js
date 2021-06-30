import {useState, useEffect} from 'react'

const useAuthContext = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({name:'', photo:'', email:'', token:'', token_type:'Bearer', id:''})
    return{
        user,
        setUser,
        loading,
        setLoading,
        logOut:()=>{
            console.log('Logout', user);
            setUser({name:'', photo:'', email:'', token:'', token_type:'Bearer', id:''})
        }
    }
}

export default useAuthContext