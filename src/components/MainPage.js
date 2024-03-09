import React, { useState } from "react";
import Content1 from "./Content1";
import Content2 from "./Content2";
import Content3 from "./Content3";
import axios from 'axios';

const MainPage = () => {
    const [sizes, setSizes] = useState({
        content1: 20, // Percentage of parent container
        content2: 80, // Adjust these percentage values as needed
        content3Height: 200, // Height in pixels for the content3
    });

    const handleAdd = () => {
        const newData = {
            // Define your data properties here
            // Example:
            name: "Evangeline",
            age: 20,
            email: "eva@example.com"
        };
        // Make a POST request to add data
        axios.post('/api/add',  newData)
            .then(response => {
                // Handle success
                console.log("Data added successfully");
            })
            .catch(error => {
                // Handle error
                console.error("Error adding data:", error);
            });
    };

    const handleUpdate = () => {
        // Make a PUT request to update data
        axios.put('/api/update')
            .then(response => {
                // Handle success
                console.log("Data updated successfully");
            })
            .catch(error => {
                // Handle error
                console.error("Error updating data:", error);
            });
    };

    const handleCount = () => {
        // Make a GET request to get count
        axios.get('/api/count')
            .then(response => {
                const { addCount, updateCount } = response.data;
                console.log(`Add count: ${addCount}, Update count: ${updateCount}`);
            })
            .catch(error => {
                // Handle error
                console.error("Error fetching count:", error);
            });
    };

    const handleResize = (contentName, delta) => {
        setSizes((prevSizes) => {
            const newSizes = { ...prevSizes };

            if (contentName === 'content3') {
                newSizes.content3Height += delta; // Adjust the height by delta
            } else {
                // Adjust the width percentages for content1 and content2
                newSizes[contentName] += delta;
                if (contentName === 'content1') {
                    newSizes.content2 -= delta;
                } else {
                    newSizes.content1 -= delta;
                }
            }

            return newSizes;
        });
    };

    return (
        <React.Fragment>
            <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Top row for content1 and content2 */}
                <div style={{ display: 'flex', width: '100%' }}>
                    <div
                        className="resizable content1"
                        style={{ width: `${sizes.content1}%`, marginRight: '2px' }}
                        onDoubleClick={() => handleResize('content1', 5)} // Example interaction
                    >
                        <Content1/>
                    </div>
                    <div
                        className="resizable content2"
                        style={{ width: `${sizes.content2}%`, marginLeft: '2px' }}
                        onDoubleClick={() => handleResize('content2', 5)} // Example interaction
                    >
                        <Content2/>
                    </div>
                </div>
                {/* Bottom row for content3 */}
                <div
                    className="resizable content3"
                    style={{ width: '100%', height: `${sizes.content3Height}px`, marginTop: '10px' }}
                    onDoubleClick={() => handleResize('content3', 20)} // Example interaction for adjusting height
                >
                    <Content3/>
                </div>
            </section>
            <div>
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCount}>Count</button>
            </div>
            <style>
                {`
                    .resizable {
                        overflow: hidden;
                        resize: both;
                        border: 1px solid #ddd; /* Just for visibility */
                    }
                    
                    .content1 {
                        background-color: pink;
                    }
                    
                    .content2 {
                        background-color: aqua;
                    }
                    
                    .content3 {
                        background-color: greenyellow;
                    }
                `}
            </style>
        </React.Fragment>
    );
}

export default MainPage;
