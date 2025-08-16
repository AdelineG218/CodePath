import './Home.css'
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

const Home = () => {
    const [creators, setCreators] = useState([]);
    
    useEffect(() => {
        const fetchCreators = async () => {
            const {data} = await supabase
                .from('creators')
                .select()
                .order('created_at', {ascending: false})
            setCreators(data)
        }
        fetchCreators();
    }, []);

    return (
        <div>
            {creators && creators.length > 0 ? 
            <div className='Cards'>
                {creators.map((c) =>
                <Link to={'/creator/' + c.id} key={c.id} style={{textDecoration: 'none'}}>
                    <Card
                        id={c.id}
                        name={c.name}
                        url={c.url}
                        desc={c.desc}
                    />
                </Link>)}
            </div> : <p className='empty'>No creators here 😭</p>}
        </div>
    )
}

export default Home