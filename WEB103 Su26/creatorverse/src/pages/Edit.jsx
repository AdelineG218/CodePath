import './Edit.css'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { useParams } from 'react-router-dom'

const Edit = () => {
    const {id} = useParams()
    const [creator, setCreator] = useState()

    useEffect(() => {
        const fetchCreator = async () => {
            const {data} = await supabase
                .from('creators')
                .select()
                .eq('id', id)
                .single()
            setCreator(data)
            console.log(data)
        }
        fetchCreator();
    }, [id])

    const handleChange = (event) => {
        const {name, value} = event.target
        setCreator( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const editCreator = async (event) => {
        event.preventDefault();
        
        const {data, error} = await supabase
            .from('creators')
            .update({name: creator.name, url: creator.url, desc: creator.desc, img: creator.img})
            .eq('id', id);
        
        if (error) {
            console.error("Error:", error.message);
            alert("Failed to create creator.");
        } else {
            console.log("Creator created:", data);
            window.location = "/";
        }
    }

    const deleteCreator = async (event) => {
            event.preventDefault();
    
            const {error} = await supabase
                .from('creators')
                .delete()
                .eq('id', id);
            
            if (error) {
                console.error("Insert error:", error.message);
                alert("Failed to delete crewmate.");
            } else {
                console.log("Crewmate deleted.");
                window.location = "/";
            }
        }

    return (
        <div>
            <h2 className='title'>Edit/Delete Creator</h2>
            {creator ? <form>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} /><br />
                <br />
                <label htmlFor="url">Socials Link</label> <br />
                <input type="text" id="url" name="url" value={creator.url} onChange={handleChange} /><br />
                <br />
                <label htmlFor="desc">Description</label> <br />
                <textarea className='desc' type="text" id="desc" name="desc" value={creator.desc} onChange={handleChange} rows="5" /><br />
                <br />
                <label htmlFor="img">Image</label> <br />
                <input type="text" id="img" name="img" value={creator.img} onChange={handleChange} /><br />
                <br />
                <input type="submit" value="Submit" onClick={editCreator} />
                <button className="deleteButton" onClick={deleteCreator}>Delete</button>
            </form> : "no creator found"}
        </div>
    )
}

export default Edit