import {useState} from 'react'
import { useParams } from 'react-router-dom'
import './EditPost.css'

const EditPost = ({data}) => {

    const {id} = useParams()
    const [post, setPost] = useState({id: null, title: "", author: "", description: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <form>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" value={post.name} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="speed">Speed Level</label><br />
                <input type="text" id="speed" name="speed" value={post.speed} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="strength">Strength Level</label><br />
                <input type="text" id="strength" name="strength" value={post.strength} onChange={handleChange} /><br />
                <br/>
                <input type="submit" value="Submit" />
                <button className="deleteButton">Delete</button>
            </form>
        </div>
    )
}

export default EditPost