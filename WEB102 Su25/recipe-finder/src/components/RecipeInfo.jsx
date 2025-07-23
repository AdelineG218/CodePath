import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./RecipeInfo.css";

function RecipeInfo(/*{name, healthScore, prepTime, servings}*/) {
    const {id} = useParams();
    const [info, setInfo] = useState(null);
    const [tags, setTags] = useState(null);
    const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

    useEffect(() => {
        const fetchInfo = async () => {
            const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            const json = await response.json();
            console.log(json);
            setInfo(json);
            const t = [...json.cuisines].concat(json.diets).concat(json.occasions).concat(json.dishTypes);
            setTags(t);
        }
        fetchInfo().catch(console.error);
    }, []);

  return (
    <div>
        {info ?
        <div>
            <img className="large-pic" src={info.image} alt={info.title} />
            <h2>{info.title}</h2>
            <span>Health Score: {info.healthScore} • Servings: {info.servings} • Ready in: {info.readyInMinutes} min{info.preparationMinutes && ` • Prep Time: ${info.preparationMinutes} min`}{info.preparationMinutes && ` • Cook Time: ${info.cookingMinutes} min`}</span>
            <div className="tags">
                {tags&& tags.map((t) => (
                    <p className="tag">{t}</p>
                ))}
            </div>

            {info.summary}

            <table>
                <tbody>
                    <tr>
                        <th>Source</th>
                        <td>{info.sourceName}</td>
                    </tr>
                    <tr>
                        <th>Source URL</th>
                        <td>{info.sourceUrl}</td>
                    </tr>
                </tbody>
            </table>
            <a href={info.sourceUrl} target="_blank" rel="noopener noreferrer">View Recipe</a>
        </div>
        :
        <div>
        </div>}
        
    </div>
  )
}

export default RecipeInfo;