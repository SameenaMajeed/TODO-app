import React , { useState} from 'react'


function List() {
    const [state , setState] = useState(true)
    const login = () =>{
        setState(!state)
    }
  return (
    <div>
      <button onClick={login}>{state ? 'Login':'Logout'}</button>
      <p>{state ? 'please Login ' : 'welcom this is login'}</p>
    </div>
  )
}

export default List
