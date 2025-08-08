import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import './EditPage.css'


const EditPage = () =>  {
    const {id} = useParams();
    const [edit, setEdit] = useState({title: "", desc: "", steps: "", image: ""});
    
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('builds')
                .select()
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching build:", error.message);
            } else {
                setEdit(data);
            }
        };

        fetchPost();
    }, [id]);
    
    const handleChange = (event) => {
        const {name, value} = event.target
        setEdit( (prev) => {
        return {
            ...prev,
            [name]:value,
        }
        })
    }
  
    const editPost = async (event) => {
        event.preventDefault();

        const {data, error} = await supabase
        .from('builds')
        .update({title: edit.title, desc: edit.desc, steps: edit.steps, image: edit.image})
        .eq('id', id);
        
        if (error) {
        console.error("Error:", error.message);
        alert("Failed to edit build.");
        } else {
            console.log("Build edited:", data);
            window.location = "/";
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
    
    return (
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={edit.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="desc">Description</label><br />
                <textarea name="desc" value={edit.desc} onChange={handleChange} rows="5" /><br />
                <br/>

                <label htmlFor="steps">Steps</label><br />
                <textarea name="steps" value={edit.steps} onChange={handleChange} rows="10" /><br />
                <br/>

                <label htmlFor="image">Image</label><br />
                <input type="text" id="image" name="image" value={edit.image} onChange={handleChange} /><br />
                <br/>
            </form>
            <div className='buttons'>
                <button className='submit' onClick={editPost}>Submit</button>
                <button className='delete' onClick={deletePost}>Delete</button>
            </div>
        </div>
    )
}

export default EditPage;