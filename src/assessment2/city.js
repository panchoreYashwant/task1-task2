import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class City extends Component {
    state = {
        Id: "",
        Name: "",
        city: "",
        salary: "",
        dob: "",
         empData: [],
         selectCity:"",
         filterCity:[],
      };
    
      submit = () =>{
        const empData = {
          Id: this.state.Id,
          Name: this.state.Name,
          city: this.state.city,
          salary: this.state.salary,
          DOB: this.state.dob,
        };
        axios.post("http://127.0.0.1:1111/postCity",empData).then(res=>{
            this.getCity()

        })
        
      };
      getCity=()=>{
        
        axios.get("http://127.0.0.1:1111/getCity").then(res=>{
            this.setState({empData:res.data,filterCity:res.data})

            // console.log(res.data)
      })}
      componentDidMount(){
        this.getCity();
      }
      
      empId = (e) => {debugger
        // alert(e);
        axios.get(`http://127.0.0.1:1111/getDataByCity/${e}`).then(res=>{
            console.log(res.data)
            this.setState({filterCity:res.data})
            
        });
      }
      
    render() { 
        return (<>
        <Link to="/">
    <button className="btn btn-dark m-2" >Task-1</button> 
            
        </Link>
            <div className="p-5">
        <form className='w-75 m-auto'>
          <h2 className='text-center'>Register Employee !</h2>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Employee Id
            </label>
            <input
              type="email"
              class="form-control"
              placeholder="Uniqui Id"
              onChange={(e) => this.setState({ Id: e.target.value })}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Employee Name</label>
            <input
              type="text"
              placeholder="Name"
              class="form-control"
              onChange={(e) => this.setState({ Name: e.target.value })}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              City
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="City"
              onChange={(e) => this.setState({ city: e.target.value })}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Salary
            </label>
            <input
              type="number"
              class="form-control"
              placeholder="Salary"
              onChange={(e) => this.setState({ salary: e.target.value })}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Date Of Birth
            </label>
            <input
              type="date"
              class="form-control"
              onChange={(e) => this.setState({ dob: e.target.value })}
              placeholder="DOB"
            />
          </div>
          <button type="button" onClick={this.submit} class="btn btn-primary">
            Submit
          </button>
        </form>
          
        <div className='mt-5 w-75 m-auto'>
          <h3 className='text-center text-danger '>Get Employe data</h3>
          <form>
            <select
              class="form-select"
              onChange={(e) => this.empId(e.target.value,)}
              aria-label="Default select example"
            >
              <option >Open this select menu</option>
              {this.state.empData.map((i) => (
                <option value={i.city} key={i}>
                  {i.city}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>  
      <table className="table m-5 border m-auto w-75">
            <tr>
                <th>Id</th>
                <th>Name </th>
                <th>City</th>
                {/* <th>DOB</th> */}
                <th>Salary</th>
            </tr>
            {this.state.filterCity.map((i) => (<tr className='border'>
                <td value={i.city} key={i}>
                  {i._id}
                </td><td>{i.Name}</td><td>{i.city}</td><td>{i.salary}</td></tr>
              ))}
        </table>    
        </>);
    }
}
 
export default City;