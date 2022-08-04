import React, { useEffect, useState } from "react";


import axios from 'axios';
import Assign from './workAssign';
import { Link } from "react-router-dom";


class  Users extends React.Component {

    state ={
      
            name:"",
            mobile: "",
            password: "",
            role:"",
            data:[],
            display :"none",
            taskId : "",
            assign:"none",
            addmin : "none",
            userForm:"block",

            userName : "",
            userPassword : "",
            userLogData:"",
            
        
    }
    
getusercall(){
    axios.get('http://127.0.0.1:1111/getUser').then((res) => {
            this.setState({data:res.data})
        })
}
    componentDidMount() {
        
            this.getusercall();
        
    };
     adduser = ()=>{ 
    
        let data = {
            name:this.state.name,
            password:this.state.password,
            telphone:this.state.mobile,
            role:this.state.role,
            active:'true',
            assign : "",
            date:"",
            role:this.state.role
        }
    
        axios.post("http://127.0.0.1:1111/addUser",data).then(res=>{
            this.getusercall();
                    });;
        
      };


      userRemove = (id)=>{debugger
        axios.delete(`http://127.0.0.1:1111/deleteUser/${id}`).then(res=>{
            this.getusercall();
                    });;
       

      }
      userActive=(id,dt)=>{
        const data = {active:dt=== "true"?"false":"true"}
        axios.put(`http://127.0.0.1:1111/updateUser/${id}`,data).then(res=>{
            this.getusercall();
                    });;
        // this.getusercall();
    
      }
      task = (id)=>{
        // e.preventDefault();
        this.setState({assign:!this.state.display,taskId:id})
        
        
        

      }
      submit = ()=>{debugger
            var data = {
                assign : this.state.assign,
                date:this.state.date,
            }
        
            var id =  this.state.taskId

        //  console.log(id)
        //  console.log(data)

        axios.put(`http://127.0.0.1:1111/updateUser/${id}`,data).then(res=>{
this.getusercall();
        });

        

      }

      addminClick = ()=>{
        this.setState({addmin:"block"})

      }

      userClick=()=>{
        this.setState({addmin:"none"})
        this.setState({userForm:"block"})
      }
      style={
        color:"red"
      }
      Login =async()=>{debugger
        const data = {
            name:this.state.userName,
            password:this.state.userPassword
        }
       
       await axios.post("http://127.0.0.1:1111/loginUser",data).then(res=>{
                        this.setState({userLogData:res.data})
                        if(res.data === ""){
                            alert("password and ID is wrong!!")
                        }
                        if(res.data.active === "false"){
                            alert("user is not activate")
                            
                        } if(res.data.active === "true"){
                            if(res.data.role === "manager"){
                                this.setState({addmin:"block"})   
                                this.setState({userForm:"none"})

                            }
                            if(res.data.role === "employe"){
                                document.write(`
                                <h2 >your work</h2>
                                <h1 style="color:black;background:yellow;" > Hi ${res.data.name}<br/> ${res.data.assign} date ${res.data.date}</h1>`)
                            }
                        }
                        

        })
        console.log(this.state.userLogData);


        
        

        // console.log(this.state.userName,this.state.userPassword)
      }
      
      


render(){
   


  



  return (
    <>
    {/* {/* <button className="btn btn-success m-2" onClick={this.addminClick}>Addmin</button> */}
    <Link to="/task2">
    <button className="btn btn-dark m-2" >Task-2</button> 
    
    </Link>
    <div style={{display:this.state.addmin}}>
     
      <div className="m-auto w-75">
        <table className="table " hover>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </div>
      <hr></hr>

       <table className="table">
        <thead>
            <tr>
                <td>Name</td>
                <td>Password</td>
                <td>Phone</td>
                <td>Task</td>
                <td>submition Date</td>
                <td>Active</td>
                <td>Remove</td>

            </tr>
        </thead>
        <tbody>
            {this.state.data.map(dt=>
            <tr>
                <td>
                    {dt.name}
                </td>
                <td>
                    {dt.password}***
                </td> 
                <td>
                    {dt.telphone}
                </td>
                <td>
                    {dt.assign}
                </td>
                <td>{dt.date}</td>
                <td>
                    <button onClick={()=>this.userActive(dt._id,dt.active)} className="btn btn-primary">{dt.active}</button>
                </td>

                <td>
                    <button className="btn btn-danger" onClick={()=>this.userRemove(dt._id)}>remove</button>
                </td>
                <td>
                    <button  onClick={(e)=>this.task(dt._id, e)} className="btn btn-warning">Task</button>
                </td>
            </tr>
                )}
            
        </tbody>
      </table> 

        <div style={{display:this.state.assign}} className='form p-5 border w-75 m-auto bg-light'>
            <h1 className='text-center text-warning'>Work Assign</h1>
            <div className='form-group'>
                <input className='form-control' placeholder='work' type="text" onChange={(e)=>this.setState({assign:e.target.value})}></input>
                <input type="date" className="form-control" onChange={(e)=>this.setState({date:e.target.value})} placeholder="date"></input>
            </div>
            <button className='btn btn-primary w-100 mt-3' onClick={this.submit} >submit</button>
        </div> 

     </div>


{/* ======================== log in form */}

     <form style={{display:this.state.userForm}} className='form p-5 border m-auto w-50 '>
            <h1 className='text-center'>Login with employe data or manager data </h1>
            {/* <p>for manager:user & pass = z,employe:user&pass:x,</p> */}
            <div className='form-group m-2'>
                <input className='form-control' placeholder='Username' type="text" onChange={(e)=>this.setState({userName:e.target.value})}></input>
            </div>
            <div className='form-group m-2'>
                <input className='form-control' placeholder='Password' type="text" onChange={(e)=>this.setState({userPassword:e.target.value})}></input>
            </div>
            <button type="button" className='btn btn-primary w-100 mt-3' onClick={this.Login} >Login</button>
        </form> 

                <br/><br/>
        <hr className="bg-danger"/>
        <br/><br/>

        <form className="p-5 form bg-light m-auto w-75" action="">
            <h3 className="text-center">Register Form</h3>
            <br/>
        <div className="form-group">
          <input
            className="form-control m-2"
            type="text"
            onChange={(e) => this.setState({name:e.target.value})}
            placeholder="add user"
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => this.setState({password:e.target.value})}
            className="form-control m-2"
            type="password"
            placeholder="password"
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e)=>this.setState({mobile : e.target.value})}
            className="form-control m-2"
            type="tel"
            placeholder="mobile No"
          />
        </div>
        <div className="form-group">
         <select className="form-control m-2" onChange={(e)=>this.setState({role:e.target.value})}>
            <option>Role</option>
            <option>manager</option>
            <option>employe</option>

         </select>
        </div>
        <button
          type="button"
          onClick={this.adduser}
          className="btn btn-success w-100"
        >
          Add 
        </button>
      </form>

    </>
  );
}

}

export default Users;