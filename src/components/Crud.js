import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import uuid from 'react-uuid';


const getData = () => {
    const data = localStorage.getItem('data');
    if(data){
        return JSON.parse(data);
    }else{
        return [];
    }
}

const Crud = () => {
    
    const small_id = uuid();
    
    const id = small_id.slice(0,1)
    const[value,setValue] = useState({fname : '', lname : ''});
    const[data,setData] = useState(getData());
    const[updateId,setUpdateId] = useState('');
    
    const onChange = (e) => {
        setValue({...value,[e.target.name]: e.target.value});
    }

    const deleteData = (id) => {
        const mydata = data.filter((e,index) => {
            return e.id !== id
        })
        setData(mydata);
    }
const Update = (id) => {
    setUpdateId(id);
    const findData =  data.find((e) => {
        return id === e.id;
    })
    setValue(findData)
}

    const Submit = (e) => {
        const myData = data && data.map(x => {
            if (x.id == updateId) {
                return {
                    ...x,
                    fname: value.fname,
                    lname : value.lname
                }
            }
            return x;
        })
        e.preventDefault();
        const newdata = { id , fname : value.fname,  lname : value.lname}
        updateId ? setData(myData) : setData([...data,newdata]);
        setValue({fname : '',lname: ''})
        setUpdateId('');
    }

    useEffect(() => {
        localStorage.setItem('data',  JSON.stringify(data));
    },[data])

  return (
    <div className="container mt-5">
        <div className="form">
    <form   onSubmit={Submit}>

        <label htmlFor="fname">First Name</label><br />
        <input required  type="text" name="fname" id="fname" value={value.fname} onChange={onChange} placeholder='Enter First Name' /> <br />
        <label htmlFor="lname">Last Name</label><br />
        <input required type="text" name="lname" id="lname" onChange={onChange} value={value.lname} placeholder='Enter Last Name' /><br />
        <button className='btn btn-success' type="submit">{updateId ? 'Update' : 'Submit'}</button>
    </form>
        </div>

<div className="data-container">
<Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length < 1 &&  <td colSpan={4} className="text-center p-3">Data Not Added</td>  }
        {data && data.map((e,index) => {
            return(
             <tr key={index}>
                <td>{e.id}</td>
          <td>{e.fname}</td>
          <td>{e.lname}</td>
          <td><button type="button" className="btn btn-primary ml-2" onClick={() => Update(e.id)}>Update</button> <button  onClick={() => deleteData(e.id)} className="pl-2 btn btn-danger">Delete</button></td>
        </tr>
            )
        })}
       
       
      </tbody>
    </Table>
</div>

    </div>
  )
}

export default Crud