import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function DataTable({ data }) {
  
  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Author</th>
          <th>Title</th>
          <th>Publish Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((post) => {
          return (
            <tr>
              <td>
              {/* Link to as Object to allow post data to be passed as State via props.location.state */}
              <Link
                to={{
                  pathname: `/${post.id}`,
                  state: {
                    details: post,
                  },
                }}
              >
                Learn More
                <ArrowForwardIcon />
              </Link>
              </td>
              <td>{post.author.name}</td>
              <td>{post.title}</td>
              <td>{post.publishDate}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

const Table = styled.table`
    width: 100%;
    padding: 25px;
    border-spacing: 10px 6px;

    @media only screen and (max-width: 768px) {
      padding: 0;
      font-size: 10px;
    }

    th {
      text-align: left;
    }

    a {
      text-decoration: none;
      width: fit-content;
      font-size: 12px;
      color: #000000;
      padding: 4px 8px;
      background-color: #F5F5F5;
      border: 1px solid #D5D5D5;
      outline: none;
      border-radius: 8px;
      font-weight: bold;
      display: flex;
      align-items: center;
      cursor: pointer;

      @media only screen and (max-width: 768px) {
        font-size: 10px; 
        padding: 2px 4px;

        svg {
          font-size: 10px;
        }
      }

      svg {
        transition: 0.3s ease;
      }

      &:hover  {
        background-color: #D5D5D5;
        
        svg {
        padding-left: 5px;
      }
    }
  `;  

export default DataTable
