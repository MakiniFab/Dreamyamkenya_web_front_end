import React, {useEffect, useState} from 'react';


const ProjectList = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch("http://127.0.0.1:5555/projects")
        .then((res) => res.json())
        .then((data) => setData(data));
    }, []);

    return (
        <div>
            <h2>Projects List</h2>
            <ol>
                {data.map((project) => (
                    <li key={project.id}>
                        <p>{project.project_name}</p>
                        <p>{project.description_about}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default ProjectList;