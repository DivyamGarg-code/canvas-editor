import React, { useEffect, useRef, useState } from 'react';

function DrawingTool() {
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 1000;
        canvas.height = 600;
        // canvas.style.width = `${window.innerWidth}px`;
        // canvas.style.height = `${window.innerHeight}px`;
        const context = canvas.getContext("2d");
        // context.scale(2, 2);
        contextRef.current = context;
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
    }, []);

    const startDrawing = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;
        contextRef.current.beginPath();
        const y=offsetY;
        contextRef.current.moveTo(offsetX,y);
        setIsDrawing(true);
    }

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    const draw = (event) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = event.nativeEvent;
        const y=offsetY;
        contextRef.current.lineTo(offsetX);
        contextRef.current.stroke();
    }

    return (
        <canvas
            style={{border:"1px solid black"}}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        />
    )
}

export default DrawingTool;
