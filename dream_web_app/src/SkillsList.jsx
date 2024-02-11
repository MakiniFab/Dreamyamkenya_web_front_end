import React, {useEffect, useState} from 'react';


const SkillsList = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch("http://127.0.0.1:5555/skills")
        .then((res) => res.json())
        .then((data) => setData(data));
    }, []);

    return (
        <div>
            <h2>Skills List</h2>
            <ol>
                {data.map((skill) => (
                    <li key={skill.id}>
                        <p>{skill.skill}</p>
                        <p>{skill.description}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default SkillsList;