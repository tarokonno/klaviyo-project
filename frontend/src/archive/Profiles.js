import React from "react";

const Profiles = ({data}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
                
                {
                    (typeof data === 'undefined') ? (<tr><td>Loading...</td></tr>) : (
                        data.map((profile, i) => (
                                <tr key={i}>
                                    <td>{profile.id}</td>
                                    <td>{profile.attributes.first_name}</td>
                                    <td>{profile.attributes.last_name}</td>
                                    <td>{profile.attributes.email}</td>
                                </tr>
                            )
                        )
                    )
                }
            </tbody>
        </table>
    );
};

export default Profiles;