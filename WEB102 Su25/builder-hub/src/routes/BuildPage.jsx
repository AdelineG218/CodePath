import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './BuildPage.css'
import { supabase } from '../client'


const BuildPage = () =>  {
    const {id} = useParams();
    const [build, setBuild] = useState(null);

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
                setBuild(data);
            }
        };

        fetchPost();
    }, [id]);

    if (!build) return <p>Loading...</p>;

    return (
        <div className="Post">
            <h1 className="pname">{build.title}</h1>
            <p className="pdescription">{build.desc}</p>
            {build.image && <image src={build.image} />}
        </div>
    );
};

export default BuildPage;