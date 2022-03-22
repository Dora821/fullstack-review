import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.getTop25 = this.getTop25.bind(this);
  }

  // componentDidMount() {
  //   axios.get('/repos')
  //   .then((data)=> this.setState({repos: data}))
  //   .catch((err)=> console.error(err));
  // }
// when refresh the page, user send get request to get top 25 from databse
  componentDidMount() {
   this.getTop25();
  }
// When clicking add button, user send post request to server
  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos', {username: term})
    .then(() => (this.getTop25()))
    .catch((err)=> {alert('failed to add the repo')});
  }

  getTop25() {
    axios.get('/repos')
    .then((res)=> {this.setState({repos: res.data})})
    .catch((error)=>{console.log(error)})
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));