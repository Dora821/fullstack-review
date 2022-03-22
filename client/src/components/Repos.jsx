import React from 'react';

const Repos = (props) => (
  <div>
    <span>{props.item.repo_name}</span>
    <span></span>
    <a href={props.item.url}>{props.item.url}</a>
  </div>
)

export default Repos;