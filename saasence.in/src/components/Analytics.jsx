// components/AnalyticsDashboard.jsx
import React from 'react';

const AnalyticsDashboard = () => {
  // Eyeballed data points to closely match the visual representation in the image.
  // The scale is relative to maxGraphValue for SVG path generation.
  const viewsData = [1500, 2000, 2500, 3800, 3500, 4000, 4500, 4000, 5218, 5400, 5600, 5800];
  const clicksData = [1000, 1200, 1500, 2000, 1800, 2200, 2500, 2000, 2005, 2500, 3000, 3500];

  const maxGraphValue = 6000; // Slightly above max data point for visual padding at the top
  const svgWidth = 800; // Internal viewBox width for SVG coordinate system
  const svgHeight = 300; // Internal viewBox height for SVG coordinate system

  const yAxisLabels = [4000, 3000, 2000, 1000]; // Y-axis labels from the image

  // Function to convert data points to an SVG path string
  // Assumes a fixed width and height for the SVG viewBox
  const getSvgPath = (data, width, height, maxValue) => {
    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * width; // Distribute points evenly across width
        const y = height - (value / maxValue) * height; // Invert Y-axis for SVG (0 is top)
        return `${x},${y}`;
      })
      .join('L');
    return `M${points}`; // Start with 'M' (moveto) for the first point
  };

  const viewsPath = getSvgPath(viewsData, svgWidth, svgHeight, maxGraphValue);
  const clicksPath = getSvgPath(clicksData, svgWidth, svgHeight, maxGraphValue);

  // --- Tooltip & Vertical Line Positioning ---
  const tooltipIndex = 8; // The tooltip is aligned with the 9th data point (index 8)

  // Calculate coordinates in SVG viewBox units for the line and dots
  const tooltipSvgX = (tooltipIndex / (viewsData.length - 1)) * svgWidth;
  const tooltipSvgViewsY = svgHeight - (viewsData[tooltipIndex] / maxGraphValue) * svgHeight;
  const tooltipSvgClicksY = svgHeight - (clicksData[tooltipIndex] / maxGraphValue) * svgHeight;

  // Calculate coordinates as percentages relative to the SVG's displayed size for the tooltip div
  const tooltipXPercent = (tooltipSvgX / svgWidth) * 100;
  const tooltipYPercent = (tooltipSvgViewsY / svgHeight) * 100; // Position tooltip based on Views line

  // Determine tooltip horizontal positioning to prevent overflow
  // If the tooltip is in the right 30% of the graph, flip its position to the left
  const flipTooltip = tooltipXPercent > 70;
  const tooltipOffsetPx = 10; // Pixel offset for the tooltip from the vertical line

  const tooltipLeftStyle = `${tooltipXPercent}%`;
  const tooltipTransformXStyle = flipTooltip ? `translateX(calc(-100% - ${tooltipOffsetPx}px))` : `translateX(${tooltipOffsetPx}px)`;

  return (
    <div className="bg-black flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl"> {/* Max width container for responsiveness */}
        {/* Top Content Section */}
        <div className="p-6 pb-4 md:p-8 md:pb-4 text-white">
          <div className="flex items-center text-gray-400 text-sm md:text-base mb-2">
            {/* SVG Icon for Frontend Observability (simple lightning bolt) */}
            <svg
              className="w-4 h-4 md:w-5 md:h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            Grow Your Business
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            Fast, lightweight <span className="text-blue-400">Automations with AI</span>.
          </h1>
          <p className="text-base md:text-lg text-gray-400">
            Upgrade your business workflow with actionable, real-time actions.
          </p>
        </div>

        {/* Graph Section - Refactored for better responsiveness */}
        {/* Use flex with items-stretch to ensure Y-axis labels align with SVG height */}
        <div className="flex pt-4 pb-8 px-4 md:px-8 md:pt-6 md:pb-8 items-stretch">
          {/* Y-axis labels */}
          {/* Use flex-shrink-0 and explicit width for reliable spacing */}
          <div
            className="flex flex-col justify-between text-right text-gray-500 text-xs sm:text-sm py-4 pr-2 w-12 sm:w-16 flex-shrink-0"
            style={{ height: `${svgHeight}px` }} // Align height with SVG viewBox height
          >
            {yAxisLabels.map((label, index) => (
              <span key={index} className="leading-none">
                {label.toLocaleString()}
              </span>
            ))}
            <span className="leading-none">0</span> {/* Add 0 for the baseline */}
          </div>

          {/* SVG container for the graph */}
          {/* flex-grow allows it to take remaining space, relative for tooltip positioning */}
          <div className="flex-grow relative pl-2"> {/* Added pl-2 for a small gap between Y-axis labels and graph */}
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full">
              {/* Horizontal Grid Lines (subtle, as in the original) */}
              {yAxisLabels.map((label, index) => {
                const y = svgHeight - (label / maxGraphValue) * svgHeight;
                return (
                  <line
                    key={`grid-${label}`}
                    x1="0"
                    y1={y}
                    x2={svgWidth}
                    y2={y}
                    stroke="#374151" // gray-700 equivalent
                    strokeDasharray="2 4"
                  />
                );
              })}

              {/* Blue Line (Views) */}
              <path d={viewsPath} fill="none" stroke="#3B82F6" strokeWidth="2" /> {/* Tailwind blue-500 */}
              {/* Teal Line (Clicks) */}
              <path d={clicksPath} fill="none" stroke="#10B981" strokeWidth="2" /> {/* Tailwind emerald-500 */}

              {/* Vertical Line */}
              <line
                x1={tooltipSvgX}
                y1="0"
                x2={tooltipSvgX}
                y2={svgHeight}
                stroke="#6B7280" // Tailwind gray-500
                strokeWidth="1"
              />

              {/* Blue Dot */}
              <circle cx={tooltipSvgX} cy={tooltipSvgViewsY} r="4" fill="#3B82F6" />
              {/* Teal Dot */}
              <circle cx={tooltipSvgX} cy={tooltipSvgClicksY} r="4" fill="#10B981" />
            </svg>

            {/* Tooltip */}
            <div
              className="absolute bg-gray-800 rounded-lg shadow-xl p-3 sm:p-4 text-xs sm:text-sm z-10"
              style={{
                left: tooltipLeftStyle, // Dynamically positioned using percentage
                top: `${tooltipYPercent}%`, // Dynamically positioned using percentage
                transform: `translateY(-50%) ${tooltipTransformXStyle}`, // Vertically center and horizontally adjust based on flip
                minWidth: '150px', // Prevent content from squishing
                whiteSpace: 'nowrap', // Keep content on one line
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-300 mr-2">Views</span>
                <span className="font-semibold text-white mr-2">5,218</span>
                <span className="text-blue-400 font-semibold text-xs">+53%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 mr-2">Clicks</span>
                <span className="font-semibold text-white mr-2">2,005</span>
                <span className="text-green-400 font-semibold text-xs">+13%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;