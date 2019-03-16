import React, { Component } from 'react';
import axios from 'axios';
import Topbar from './Navbar/Topbar';
//import Likes from './Also-Like/Likes';
import Looks from './Complete-Look/Looks';
//import Description from './Product-Details/Description';
//import Specification from './Product-Details/Specification';
//import Share from './Share-Photos/Share';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      looks: {},
      cart: 0,
    };

    this.addToCart = this.addToCart.bind(this);
    this.getLooks = this.getLooks.bind(this);
  }

  componentDidMount() {
    this.getLooks(Math.floor(Math.random() * 9999990));
  }


  getLooks(id) {
    axios.get(`http://ec2-54-92-132-30.compute-1.amazonaws.com:8001/looks/${id}`)
    .then( looks => {
      looks = looks.data;
      this.setState({ looks });
    })
    .catch( err => {
      console.log('ERROR: ', err);
    })
  }

  addToCart() {
    this.setState({ cart: ++this.state.cart });
  }

  render() {
    return (
      <div>
        <Topbar cart={this.state.cart} />
        <div id="top-navbar"></div>
        <Looks looks={this.state.looks} add={this.addToCart} />
      </div>
    );
  }
}

export default App;
