import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [players, setPlayers] = useState([]);
    const [filters, setFilters] = useState({ role: "", region: "" });

    // Fetch player data from the Flask API
    useEffect(() => {
        fetch("http://127.0.0.1:5000/data")  // Make sure the Flask server is running
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Data:", data); // Log the data to check its structure
                setPlayers(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Handle filter change
    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Filtered players
    const filteredPlayers = players.filter((player) => {
        return (
            (filters.role === "" || player['Preferred Role(s)'] === filters.role) &&
            (filters.region === "" || player.Region === filters.region)
        );
    });

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Central Financial's Player Database</h1>

            {/* Filters */}
            <div className="row mb-4">
                <div className="col">
                    <label>Role</label>
                    <select
                        className="form-control"
                        name="role"
                        onChange={handleFilterChange}
                    >
                        <option value="">All</option>
                        <option value="Entry Fragger">Entry Fragger</option>
                        <option value="Support">Support</option>
                    </select>
                </div>
                <div className="col">
                    <label>Region</label>
                    <select
                        className="form-control"
                        name="region"
                        onChange={handleFilterChange}
                    >
                        <option value="">All</option>
                        <option value="Europe">Europe</option>
                        <option value="North America">North America</option>
                        <option value="OCE">OCE</option>
                    </select>
                </div>
            </div>

            {/* Player Table */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Discord Tag</th>
                        <th>Preferred Role(s)</th>
                        <th>Region</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPlayers.length > 0 ? (
                        filteredPlayers.map((player, index) => (
                            <tr key={index}>
                                <td>{player['Discord Tag']}</td>  {/* Corrected access */}
                                <td>{player['Preferred Role(s)']}</td> {/* Corrected access */}
                                <td>{player.Region}</td>
                                <td>
                                    <a
                                        href={player['Steam or FaceIt']}  // Corrected dynamic key access
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Visit
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No players found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default App;