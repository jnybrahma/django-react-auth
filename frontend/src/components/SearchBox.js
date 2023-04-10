import React,{ useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../flex-container.css';


function SearchBox() {
    
    const[keyword, setKeyword] = useState('')
    

    let history = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword){
            history(`/?keyword=${keyword}&page=1`)
        } else
          {
              history('/')
          }
        
        
    }

 return (
    <Form onSubmit={submitHandler} inline>
        <div className='flex-container'> 
        <Button 
            type='submit'
            variant= 'primary'
            className='btn-primary'><strong>Search</strong></Button>      
        <Form.Control
            type='text'
            name='q'
            placeholder='Search'
            onChange={(e) => setKeyword(e.target.value)}
            className='mr-sm-2 ml-sm-5'
        >
        </Form.Control>
       
        </div>
    </Form>
    
  )
}

export default SearchBox
