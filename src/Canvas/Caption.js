import React, { useEffect, useRef, useState } from 'react';

function Caption() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const breakTextIntoLines = (text, maxCharactersPerLine) => {
        const lines = [];
        let start = 0;
        let end = maxCharactersPerLine;

        while (start < text.length) {
            // Check if the end index is within the text length
            if (end >= text.length) {
                lines.push(text.substring(start));
                break;
            }

            // Find the nearest space character to the end index
            while (text[end] !== " " && end > start) {
                end--;
            }

            // If no space character is found, break the line at the end index
            if (end === start) {
                lines.push(text.substring(start, start + maxCharactersPerLine));
                start += maxCharactersPerLine;
                end = start + maxCharactersPerLine;
            } else {
                // Otherwise, break the line at the space character
                lines.push(text.substring(start, end));
                start = end + 1; // Move start to the next character after the space
                end = start + maxCharactersPerLine;
            }
        }

        return lines;
    }
    // Initial state based on provided data
    const initialData = {
        caption: {
            text: "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
            position: { x: 50, y: 50 },
            max_characters_per_line: 31,
            font_size: 44,
            alignment: "left",
            text_color: "#000000"
        }
    };
    const [formData, setFormData] = useState(initialData);
    // Event handler for input changes .......................................
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        // Split the name into keys to access nested properties
        const keys = name.split('.');
        const updatedFormData = { ...formData };

        // Update the nested property value
        let temp = updatedFormData;
        for (let i = 0; i < keys.length - 1; i++) {
            temp = temp[keys[i]];
        }
        temp[keys[keys.length - 1]] = value;

        // Update the formData state with the new value
        setFormData({
            ...updatedFormData
        });
    };
    // ---------------------------------------------------
    // Draw caption on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;
    }, []);

    useEffect(() => {
        const { caption } = formData;
        const lines = breakTextIntoLines(caption.text, caption.max_characters_per_line);

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Clear canvas before drawing
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.font = `${caption.font_size}px Arial`;
        context.fillStyle = caption.text_color;
        context.textAlign = caption.alignment;

        lines.forEach((line, index) => {
            context.fillText(line, caption.position.x, caption.position.y + caption.font_size * 1.2 * (index + 1));
        });
    }, [formData]);



    return (
        <div className='flex flex-row gap-4 items-center p-2 flex-wrap'>
            <canvas
                height={600}
                width={900}
                style={{ border: "1px solid black" }}
                ref={canvasRef}
            />
            <div className='flex flex-col gap-2 w-full max-w-[500px]'>
                <span className='font-bold text-xl'>Caption : </span>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="text">Text:</label>
                        <input
                            type="text"
                            id="text"
                            name="caption.text"
                            value={formData.caption.text}
                            onChange={handleChange}
                            className='border border-gray-200 p-1 w-full'
                        />
                    </div>

                    <div  className='flex items-center gap-2'>
                        <label htmlFor="positionX">Position X:</label>
                        <input
                            type="number"
                            id="positionX"
                            name="caption.position.x"
                            value={formData.caption.position.x}
                            onChange={handleChange}
                            className='border border-gray-200 p-1 w-fit'
                        />
                    </div>

                    <div  className='flex items-center gap-2'>
                        <label htmlFor="positionY">Position Y:</label>
                        <input
                            type="number"
                            id="positionY"
                            name="caption.position.y"
                            value={formData.caption.position.y}
                            onChange={handleChange}
                            className='border border-gray-200 p-1 w-fit'
                        />
                    </div>

                    <div  className='flex items-center gap-2'>
                        <label htmlFor="maxCharactersPerLine">Max Characters Per Line:</label>
                        <input
                            type="number"
                            id="maxCharactersPerLine"
                            name="caption.max_characters_per_line"
                            value={formData.caption.max_characters_per_line}
                            onChange={handleChange}
                            className='border border-gray-200 p-1 w-fit'
                        />
                    </div>

                    <div  className='flex items-center gap-2'>
                        <label htmlFor="fontSize">Font Size:</label>
                        <input
                            type="number"
                            id="fontSize"
                            name="caption.font_size"
                            value={formData.caption.font_size}
                            onChange={handleChange}
                            className='border border-gray-200 p-1 w-fit'
                        />
                    </div>

                    <div  className='flex items-center gap-2'>
                        <label htmlFor="alignment">Alignment:</label>
                        <select
                            id="alignment"
                            name="caption.alignment"
                            value={formData.caption.alignment}
                            onChange={handleChange}
                            className='border border-gray-200 p-1 w-fit'
                        >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </div>

                    <div  className='flex items-center gap-2'>
                        <label htmlFor="textColor">Text Color:</label>
                        <input
                            type="color"
                            id="textColor"
                            name="caption.text_color"
                            value={formData.caption.text_color}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Caption;
