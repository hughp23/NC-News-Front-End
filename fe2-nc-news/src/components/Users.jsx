// import React, { Component } from "react";
// import * as api from "../api";
// // import User from "./User";

// class Users extends Component {
//   state = {
//     username: "",
//     user: {}
//   };
//   render() {
//     const { user } = this.state;
//     if (Object.keys(user).length) {
//       return (
//         <main className="main">
//           <h2>{user.name}</h2>
//           <p>{user.username}</p>
//         </main>
//       );
//     }
//     return (
//       <form onSubmit={this.onSubmit}>
//         <label htmlFor="searchUsername"> Search Username: </label>
//         <input type="text" onChange={this.handleChange} />
//         <button>Submit</button>
//       </form>
//     );
//   }

//   handleChange = event => {
//     const { value } = event.target;
//     this.setState({ username: value });
//   };

//   onSubmit = event => {
//     event.preventDefault();
//     api.getUsers(this.state.username).then(user => {
//       this.setState({ user });
//     });
//   };
// }

// export default Users;
