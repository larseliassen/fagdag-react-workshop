import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {

    const [numPositions, setNumPositions] = useState(null);

    useEffect(() => {
        const getNumPositions = async () => {
            const response = await fetch('https://id.jobbnorge.no/api/jobsearch/positionCount');
            const data = await response.json();
            setNumPositions(data);
        };

        getNumPositions();
    }, []);

    return (
        <h1><Link to="/">{numPositions} ledige stillinger 🎉</Link></h1>
    )
}

export default Header;