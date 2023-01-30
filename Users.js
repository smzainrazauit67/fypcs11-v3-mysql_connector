import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import './users.css';

function Users() {
  return (
    <>
      <div className="users-container">
        <Sidebar />
        <div className="users-table"> <h1> Users </h1>
          <table className="table">
            <thead className="table-dark">
              
              <tr>
                <th scope="col">Sno</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Sharoze</td>
                <td>Khan</td>
                <td>sharozekkhan@gmail.com</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Zain</td>
                <td>Raza</td>
                <td>zainraza@gmail.com</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Sameer</td>
                <td>Ullah</td>
                <td>sameer@gmail.com</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Muhammad</td>
                <td>Nasir</td>
                <td>nasir@gmail.com</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Zafir</td>
                <td>Ahmed</td>
                <td>zafir@gmail.com</td>
              </tr>
            </tbody>
          </table></div>
      </div>

    </>
  )
}

export default Users