import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Component from "./JobListingComponent.js"

const JobListing = () => {
    
    const { id } = useParams();
    const [position, setPosition] = useState(null);
    
    useEffect(() => {
        const getPos = async () => {
            const response = await fetch(
                `https://id.jobbnorge.no/api/joblisting?jobId=${id}&languageId=1`
            );
            const data = await response.json();
            setPosition(data);
        };
        getPos();
    }, [id]);

    if (!position || !position.components) {
        return <p>This is not the position you are looking for...</p>;
    }

    return (
        <div>
            {position.components.map(c => (
                <Component comp={c} />
            ))}
        </div>
    );
};

export default JobListing;