import './Details.css'
import more from '../assets/more.png'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'

const Details = () => {
    const {id} = useParams();
    const [creator, setCreator] = useState();
    
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
    }, [id]);

    return (
        <div className='Details'>
            {creator ?
            <div className='DetailsCard'>
                <img className='creatorImg' src={creator.img} alt={creator.name + "'s image"} />
                <div>
                    <a href={'/creator/' + creator.id + '/edit'}><img className="moreBtn" src={more}></img></a>
                    <h2 className="name">{creator.name}</h2>
                    <a className='link' href={creator.url}>{creator.url}</a>
                    <p className="description">{creator.desc}</p>
                </div>
            </div> : <p>Creator does not exist 🧐</p>}
        </div>
    )
}

export default Details