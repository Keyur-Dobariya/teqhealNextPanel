'use client';

import {AndroidFilled, AppleFilled, GithubFilled, InstagramFilled, WindowsFilled} from "@ant-design/icons";
import React from "react";

export default function PlanetSystem() {
    const planetCount = 5;
    const orbitRadius = 110;
    const planetSize = 50;

    const iconsList = [
        <AppleFilled />,
        <WindowsFilled />,
        // <GithubFilled />,
        <AndroidFilled />,
        <InstagramFilled />,
    ];

    const planets = Array.from({ length: iconsList.length }, (_, i) => {
        const angle = (360 / iconsList.length) * i;
        const iconWithRotation = React.cloneElement(iconsList[i], {
            rotate: -angle,
            style: {
                borderRadius: "50px",
                boxShadow: '0 0 8px 2px #366128FF, inset 0 0 5px 1px #366128FF',
                backgroundColor: 'transparent',
                display: 'block',
                margin: 'auto',
            },
        });
        return { angle, icon: iconWithRotation };
    });

    return (
        <div className="w-[300px] h-[300px] relative justify-center items-center">
            <div className="absolute top-1/2 left-1/2 w-25 h-25 bg-(--primary-color) border-2 border-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-[280px] h-[280px] border-2 border-gray-400 border-dashed rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div
                className="absolute top-1/2 left-1/2 w-0 h-0"
                style={{
                    animation: 'spinAllPlanets 15s linear infinite',
                    transformOrigin: '0 0',
                }}
            >
                {planets.map(({ angle, icon }, i) => (
                    <div
                        key={i}
                        className="absolute"
                        style={{
                            transformOrigin: '0 0',
                            transform: `rotate(${angle}deg) translateX(${orbitRadius}px)`,
                            left: 0,
                            top: 0,
                        }}
                    >
                        <div
                            className={`rounded-full shadow-md bg-(--primary-color) border-2 border-gray-400 border-dashed flex justify-center text-25 text-white`}
                            style={{
                                width: planetSize,
                                height: planetSize,
                                animation: 'spinAllPlanets 15s linear infinite reverse',
                            }}
                        >
                            {icon}
                            {/*<AppleFilled rotate={-(angle)} className="text-25 text-white" style={{color: "white"}} />*/}
                        </div>
                    </div>
                ))}
            </div>
            <style jsx>{`
                  @keyframes spinAllPlanets {
                    0% {
                      transform: rotate(0deg);
                    }
                    100% {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
        </div>
    );
}