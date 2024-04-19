"use client";
import React, { useEffect, useRef } from 'react';

const CursorCanvas = () => {
    const canvasRef = useRef(null);
    const trail = useRef([]);
    const trailLength = 10;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const trailColor = "0,128,255"; //RGB values for cyan color

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = `rgba(255,255,255,1)`;
            ctx.lineWidth = 5;
            ctx.lineJoin = 'bevel';
            ctx.lineCap = 'round';

            ctx.shadowBlur = 20;
            ctx.shadowColor = `rgba(${trailColor},1)`;


            ctx.beginPath();
            if (trail.current.length) {
                ctx.moveTo(trail.current[0].x, trail.current[0].y);
                for (let i = 1; i < trail.current.length; i++) {
                    ctx.lineTo(trail.current[i].x, trail.current[i].y);
                }
            }
            ctx.stroke();
            window.requestAnimationFrame(draw);
        }

        function addTrailPoint(x, y) {
            trail.current.push({ x, y });
            if (trail.current.length > trailLength) {
                trail.current.shift();
            }
        }

        const startDrawing = (e) => {
            const newX = e.clientX;
            const newY = e.clientY;
            addTrailPoint(newX, newY);
        }

        window.addEventListener('mousemove', startDrawing);
        draw();

        return () => {
            window.removeEventListener('mousemove', startDrawing);
        };
    }, []);

    return <canvas id="canvas" ref={canvasRef} />;
};

export default CursorCanvas;