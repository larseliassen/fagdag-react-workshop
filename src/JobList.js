import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobList = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const getPositions = async () => {
            const response = await fetch(
                `https://id.jobbnorge.no/api/jobsearch/cached?language=1`
            );
            const data = await response.json();
            setPositions(data);
        };

        getPositions();
    }, []);

    return (
        <ul>
            {positions.map(p => (
                <li>
                    <Link to={`/position/${p.id}`}>
                        {p.title} {p.deadline}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default JobList