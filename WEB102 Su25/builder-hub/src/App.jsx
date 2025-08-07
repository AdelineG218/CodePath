import { useState, useEffect } from 'react'
import { supabase } from './client';
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [builds, setBuilds] = useState([]);
  const [newBuild, setNewBuild] = useState({title: "", desc: "", image: ""});

  useEffect(() => {
    const fetchPosts = async () => {
      const {data} = await supabase
        .from('builds')
        .select()
        .order('created_at', {ascending: false});

        setBuilds(data)
    }
    fetchPosts();
  }, []);

  const filterTime = async () => {

  }

  const filterSaved = async () => {

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

    const {data, error} = await supabase
      .from('builds')
      .insert({title: newBuild.title, desc: newBuild.type, image: newBuild.image, likes: 1})
      .select();
    
    if (error) {
      console.error("Error:", error.message);
      alert("Failed to create crewmate.");
    } else {
        console.log("Build created:", data);
        window.location = "/";
    }
    setNewBuild({title: "", desc: "", image: ""});
  }

  return (
    <>
      <div>
        <button onClick={filterTime}>Newest First</button>
        <button onClick={filterSaved}>Most Popular First</button>
      </div>
      <div>
        <div className='feed'>
          {builds && builds.length > 0 ?
          [...builds].map((b) => (
            <Link to={'build/' + b.id} key={b.id} style={{textDecoration: 'none'}}>
              <div>
                <p>{b.created_at}</p>
                <h2>{b.title}</h2>
                <p>Likes: {b.likes}</p>
              </div>
            </Link>)
          ) : <></>}
        </div>
        <div className='new'>
          <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={newBuild.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="desc">Description</label><br />
                <input type="text" id="desc" name="desc" value={newBuild.desc} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="image">Image</label><br />
                <input type="text" id="image" name="image" value={newBuild.image} onChange={handleChange} /><br />
                <br/>
                
                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
      </div>
    </>
  )
}

export default App
