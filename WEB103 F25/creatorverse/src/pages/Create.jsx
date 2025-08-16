import './Create.css'
import { useState } from 'react'
import { supabase } from '../client'

const Create = () => {
    const [creator, setCreator] = useState({name: "", url: "", desc: "", img: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setCreator( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createCreator = async (event) => {
        event.preventDefault();
        
        const {data, error} = await supabase
            .from('creators')
            .insert({name: creator.name, url: creator.url, desc: creator.desc, img: creator.img})
            .select();
        
        if (error) {
            console.error("Error:", error.message);
            alert("Failed to create creator.");
        } else {
            console.log("Creator created:", data);
            window.location = "/";
        }
    }

    return (
        <div>
            <h2 className='title'>Add Creator</h2>
            <form>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} /><br />
                <br />
                <label htmlFor="url">Socials Link</label> <br />
                <input type="text" id="url" name="url" value={creator.url} onChange={handleChange} /><br />
                <br />
                <label htmlFor="desc">Description</label> <br />
                <textarea type="text" id="desc" name="desc" value={creator.desc} onChange={handleChange} rows="5" /><br />
                <br />
                <label htmlFor="img">Image</label> <br />
                <input type="text" id="img" name="img" value={creator.img} onChange={handleChange} /><br />
                <br />
                <input type="submit" value="Submit" onClick={createCreator} />
            </form>
        </div>
    )
}

export default Create