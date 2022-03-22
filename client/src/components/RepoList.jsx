import React from 'react';
import Repos from './Repos.jsx';

const RepoList = (props) => {
  return (
    <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {(props.repos).map(item => <Repos item={item} />)}
  </div>
  )

}

export default RepoList;