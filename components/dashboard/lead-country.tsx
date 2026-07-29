"use client";
import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function LeadCountry({ procedureStats }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stats = procedureStats?.data;

  const leads = [
    { name: "USA", coordinates: [-99, 38], leads: stats?.countries?.usa || 0 },
    {
      name: "Mexico",
      coordinates: [-102, 23],
      leads: stats?.countries?.mexico || 0,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 w-full h-[440px] md:h-[500px] flex flex-col">
      <h2 className="font-medium text-xl text-start mb-4">Leads by Country</h2>

      {/* Map Section */}
      <div
        className={`flex-1 flex justify-center items-center ${
          isMobile ? "-ml-5 -mt-10" : "-mt-20"
        }`}
      >
        <ComposableMap
          projectionConfig={{
            scale: isMobile ? 100 : 140,
          }}
          width={isMobile ? 450 : 900}
          height={isMobile ? 200 : 400}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: "#BDBDBD", outline: "none" },
                    hover: { fill: "#A3A3A3", outline: "none" },
                    pressed: { fill: "#8A38F5", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Lead markers */}
          {leads.map(({ name, coordinates, leads }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle
                r={isMobile ? 4 : 6}
                fill="#8A38F5"
                stroke="#fff"
                strokeWidth={1.5}
              />
              <text
                textAnchor="middle"
                y={isMobile ? -8 : -12}
                style={{
                  fontFamily: "system-ui",
                  fill: "#8A38F5",
                  fontSize: isMobile ? "8px" : "10px",
                }}
              >
                {`${name} (${leads})`}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Legend Section */}
      {/* Legend Section */}
      <div
        className={`flex ${
          isMobile
            ? "flex-row justify-start gap-6 mt-2"
            : "flex-col items-start -mt-20"
        }`}
      >
        <ol className="list-decimal pl-4 space-y-1">
          {leads.map((lead) => (
            <li key={lead.name} className="text-base text-gray-700">
              {lead.name}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
