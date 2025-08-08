import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './BuildPage.css'
import { supabase } from '../client'

const BuildPage = () =>  {
    const {id} = useParams();
    const [build, setBuild] = useState(null);
    const [newCommentText, setNewCommentText] = useState("");

    const fetchBuild = async () => {
        const { data, error } = await supabase
            .from('builds')
            .select()
            .eq('id', id)
            .single();

        if (error) {
            console.error("Error fetching build:", error.message);
        } else {
            setBuild(data);
            console.log(id, build)
        }
    };

    useEffect(() => {
        fetchBuild();
    }, [id]);

    const handleChange = (event) => {
      const {value} = event.target;
      setNewCommentText(value);
    }

    const newComment = async (event) => {
      event.preventDefault();

      const {error} = await supabase
          .from('builds')
          .update({comments: [...build.comments, newCommentText]})
          .eq('id', id);
      
      if (error) {
          console.error("Error:", error.message);
          alert("Failed to update build.");
      } else {
        setNewCommentText("");
        fetchBuild();
      } 
    }

    const newBookmark = async () => {
      const {error} = await supabase
          .from('builds')
          .update({likes: build.likes+1})
          .eq('id', id);

      console.log("loaded build")
      
      if (error) {
          console.error("Error:", error.message);
          alert("Failed to update build.");
      } else {
        fetchBuild();
      } 
    }

    const deletePost = async (event) => {
        event.preventDefault();

        const {error} = await supabase
            .from('builds')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error("Error:", error.message);
            alert("Failed to delete build.");
        } else {
            console.log("Build deleted.");
            window.location = "/";
        }
    }

    if (!build) return <p>Loading...</p>;

    return (
        <div className="Post">
            <h2>{build.title}</h2>
            {build.image && <img src={build.image} />}
            <button className='bookmark' onClick={newBookmark}>{build.likes} 🔖</button>
            <h4>Description</h4>
            <p className="pdescription">{build.desc}</p>
            <h4>Steps</h4>
            <p className='pdescription'>{build.steps}</p>

            <div className='comments'>
              <h3>Comments</h3>
              {build.comments && build.comments.map((c, i) => (
                <p key={i}>{c}</p>
              ))}
              <div className='new-comment'>
                <input type="text" name="comment" id="comment" value={newCommentText} onChange={handleChange}></input>
                <button className="add" disabled={newCommentText.trim().length === 0} onClick={newComment}>Add Comment</button>
              </div>
            </div>
            <Link to={`edit`}><button className='e'>Edit ✏️</button></Link>
            <button onClick={deletePost} className='delete'>Delete 🗑️</button>
        </div>
    );
};

export default BuildPage;