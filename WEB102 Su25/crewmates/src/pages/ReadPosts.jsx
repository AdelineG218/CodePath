import { useState, useEffect } from 'react'
import Card from '../components/Card'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        setPosts(props.data)
    }, [props])
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                [...posts]
                .sort((a, b) => a.id - b.id)
                .map((post,index) => 
                    <Card 
                        key={post.id}
                        id={post.id} 
                        name={post.name}
                        speed={post.speed}
                        strength={post.strength}
                    />
                ) : <h2>{'No Crewmates Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts