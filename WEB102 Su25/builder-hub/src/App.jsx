import { useState, useEffect } from 'react'
import { supabase } from './client';
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [builds, setBuilds] = useState([]);
  const [newBuild, setNewBuild] = useState({title: "", desc: "", steps: "", image: ""});
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const fetchPosts = async () => {
    const {data} = await supabase
      .from('builds')
      .select()
      .order('created_at', {ascending: false});

      setBuilds(data)
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 },
    ];

    for (let i of intervals) {
      const count = Math.floor(seconds / i.seconds);
      if (count > 0) {
        return `${count} ${i.label}${count !== 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };


  const filterTime = async () => {
    const fetchPosts = async () => {
      const {data} = await supabase
        .from('builds')
        .select()
        .order('created_at', {ascending: false});

        setBuilds(data)
    }
    fetchPosts();
  }

  const filterBookmarked = async () => {
    const fetchPosts = async () => {
      const {data} = await supabase
        .from('builds')
        .select()
        .order('likes', {ascending: false});

        setBuilds(data)
    }
    fetchPosts();
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setNewBuild( (prev) => {
      return {
        ...prev,
        [name]:value,
      }
    })
  }
  
  const createPost = async (event) => {
    event.preventDefault();
    if (newBuild.title.length == 0) {
      alert("Error: A title is required!");
    } else {
      const {data, error} = await supabase
        .from('builds')
        .insert({title: newBuild.title, desc: newBuild.desc, steps: newBuild.steps, image: newBuild.image, likes: 1, comments: []})
        .select();
      
      if (error) {
        console.error("Error:", error.message);
        alert("Failed to create build.");
      } else {
          console.log("Build created:", data);
          setNewBuild({title: "", desc: "", steps: "", image: ""});
          window.location = "/";
      }
    }
  }

  const newBookmark = async (event, likes, id) => {
    event.preventDefault();
    event.stopPropagation();

    const {error} = await supabase
        .from('builds')
        .update({likes: likes+1})
        .eq('id', id);

    console.log("loaded build")
    
    if (error) {
        console.error("Error:", error.message);
        alert("Failed to update build.");
    } else {
      fetchPosts();
    } 
  }

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = builds.filter((item) => {
        const searchedAttributes = [item.title].map(attr => attr.toLowerCase())
        return searchedAttributes.some(attr => attr.includes(searchValue))
      })
      if (filteredData.length>0) setFilteredResults(filteredData);
      else setFilteredResults(builds);
    } else {
      setFilteredResults(builds);
    }
  };

  return (
    <>
      <div className='filter'>
        <button onClick={filterTime}>Newest First</button>
        <button onClick={filterBookmarked}>Most Popular First</button>
      </div>
      <input type="text" placeholder="Search..." onChange={(inputString) => searchItems(inputString.target.value)}/>
      <div>
        <div className='feed'>
          {searchInput.length>0 ?
          filteredResults.map((b) => (
            <Link to={'build/' + b.id} key={b.id} style={{textDecoration: 'none'}}>
              <div className='post' style={{
                backgroundImage: `url(${b.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}>
                <div className='top'>
                  <button onClick={(event) => {event.stopPropagation();
                    newBookmark(event, b.likes, b.id);}}>{b.likes} 🔖</button>
                  <Link to={`build/${b.id}/edit`}><button>Edit ✏️</button></Link>
                </div>
                <h2 className='title'>{b.title}</h2>
                <p className='time'>{timeAgo(b.created_at)}</p>
              </div>
            </Link>)
          ) : builds && builds.length > 0 &&
          builds.map((b) => (
            <Link to={'build/' + b.id} key={b.id} style={{textDecoration: 'none'}}>
              <div className='post' style={{
                backgroundImage: `url(${b.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}>
                <div className='top'>
                  <button onClick={() => newBookmark(b.likes, b.id)}>{b.likes} 🔖</button>
                  <Link to={`build/${b.id}/edit`}><button>Edit ✏️</button></Link>
                </div>
                <h2 className='title'>{b.title}</h2>
                <p className='time'>{timeAgo(b.created_at)}</p>
              </div>
            </Link>)
          )}
        </div>
        <div className='new'>
          <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={newBuild.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="desc">Description</label><br />
                <textarea name="desc" value={newBuild.desc} onChange={handleChange} rows="5" /><br />
                <br/>

                <label htmlFor="steps">Steps</label><br />
                <textarea name="steps" value={newBuild.steps} onChange={handleChange} rows="10" /><br />
                <br/>

                <label htmlFor="image">Image</label><br />
                <input type="text" id="image" name="image" value={newBuild.image} onChange={handleChange} /><br />
                <br/>
                
                <button className='submit' onClick={createPost}>Submit</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default App
