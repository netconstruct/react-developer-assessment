import { useEffect, useState } from "react";

const getData = async () =>
  await fetch('/api/posts').then((response) => response.json());

function App() {
  const [posts,setPosts]=useState();
  useEffect(()=>{
    async function fetchData() {
      if(!posts){
        const fetchedData = await getData().catch((err)=>console.error('Failed to Fetch',err))
        if(fetchedData?.posts){
          setPosts(fetchedData.posts);
        }
      }      
    }
    fetchData();
  },[posts])
  return <div>
    <ul>
    {posts.length>0?
    posts?.map(post=><>{JSON.stringify(post)}</>):
    <li>No Posts</li>}
    </ul>
  </div>;
}

export default App;
