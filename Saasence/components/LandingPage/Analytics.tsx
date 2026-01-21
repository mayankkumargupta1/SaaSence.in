"use client";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp, Zap } from "lucide-react";
import React, { useMemo, useState, useEffect, useRef } from "react";

// Data and helper functions remain the same
const viewsData = [
  1500, 2000, 2500, 3800, 3500, 4000, 4500, 4000, 5218, 5400, 5600, 5800,
];
const clicksData = [
  1000, 1200, 1500, 2000, 1800, 2200, 2500, 2000, 2005, 2500, 3000, 3500,
];
const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Point {
  x: number;
  y: number;
}

const getSvgPath = (
  data: number[],
  width: number,
  height: number,
  maxValue: number,
  smooth: boolean = false,
): string => {
  if (data.length === 0) return "M0,0";

  const points: Point[] = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - (value / maxValue) * height;
    return { x, y };
  });

  if (!smooth || points.length < 2) {
    return `M${points.map((p) => `${p.x},${p.y}`).join("L")}`;
  }

  let path = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += `C${cp1x},${cp1y},${cp2x},${cp2y},${p2.x},${p2.y}`;
  }
  return path;
};

const AnalyticsDashboard = () => {
  const maxGraphValue = 6000;
  const svgWidth = 800;
  const svgHeight = 300;
  const yAxisLabels = [6000, 4000, 2000, 0];

  const viewsPath = useMemo(
    () => getSvgPath(viewsData, svgWidth, svgHeight, maxGraphValue, true),
    [viewsData],
  );
  const clicksPath = useMemo(
    () => getSvgPath(clicksData, svgWidth, svgHeight, maxGraphValue, true),
    [clicksData],
  );

  const tooltipDataIndex = 8;
  const tooltipMonth = monthLabels[tooltipDataIndex];
  const tooltipViews = viewsData[tooltipDataIndex];
  const tooltipClicks = clicksData[tooltipDataIndex];

  const viewsPercentageChange = 53;
  const clicksPercentageChange = 13;

  const [tooltipVisible, setTooltipVisible] = useState(true);
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0,
    svgYViews: 0,
    svgYClicks: 0,
    flip: false,
  });
  const svgContainerRef = useRef<HTMLDivElement>(null); // Specify the type here

  useEffect(() => {
    if (!svgContainerRef.current) return;

    const containerWidth = svgContainerRef.current.offsetWidth;
    const svgX = (tooltipDataIndex / (viewsData.length - 1)) * svgWidth;
    const svgYViews = svgHeight - (tooltipViews / maxGraphValue) * svgHeight;
    const svgYClicks = svgHeight - (tooltipClicks / maxGraphValue) * svgHeight;

    const displayX = (svgX / svgWidth) * containerWidth;

    setTooltipPosition({
      x: displayX,
      y: svgYViews,
      svgYViews: svgYViews,
      svgYClicks: svgYClicks,
      flip: displayX > containerWidth * 0.7,
    });
  }, [tooltipDataIndex, tooltipViews]);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 selection:bg-purple-500 selection:text-white"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      ref={ref}
    >
      <div className="w-full max-w-5xl space-y-8">
        {/* Header Section */}
        <motion.div
          className="text-center md:text-left p-4 rounded-xl"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center justify-center md:justify-start text-purple-400 text-sm md:text-base mb-2"
            variants={itemVariants}
          >
            <Zap className="w-5 h-5 mr-2" />
            <span>Grow Your Business</span>
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight max-w-2xl text-slate-100"
            variants={itemVariants}
          >
            Fast, Lightweight{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 text-transparent bg-clip-text">
              Automations with AI.
            </span>
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto md:mx-0"
            variants={itemVariants}
          >
            Upgrade your business workflow with actionable, real-time insights
            and automated actions.
          </motion.p>
        </motion.div>

        {/* Analytics Card */}
        <motion.div
          className="bg-slate-800/70 backdrop-blur-md shadow-2xl rounded-xl p-4 sm:p-6 md:p-8 border border-slate-700/50"
          variants={itemVariants}
        >
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
            variants={itemVariants}
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Performance Overview
              </h2>
              <p className="text-sm text-slate-400">Last 12 Months</p>
            </div>
          </motion.div>

          {/* Graph Section */}
          <motion.div className="flex items-start" variants={itemVariants}>
            <div
              className="flex flex-col justify-between text-right text-slate-500 text-xs sm:text-sm pt-1 pr-3 sm:pr-4 flex-shrink-0"
              style={{ height: `${svgHeight}px` }}
            >
              {yAxisLabels.map((label) => (
                <span key={`y-${label}`} className="leading-none">
                  {label >= 1000 ? `${label / 1000}k` : label}
                </span>
              ))}
            </div>
            <div className="flex-grow relative" ref={svgContainerRef}>
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient
                    id="viewsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="clicksGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {yAxisLabels.map((label) => {
                  const y = svgHeight - (label / maxGraphValue) * svgHeight;
                  return (
                    <line
                      key={`grid-${label}`}
                      x1="0"
                      y1={y}
                      x2={svgWidth}
                      y2={y}
                      stroke="rgba(255, 255, 255, 0.07)"
                      strokeDasharray="3 3"
                    />
                  );
                })}

                <path
                  d={`${viewsPath} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`}
                  fill="url(#viewsGradient)"
                />
                <path
                  d={`${clicksPath} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`}
                  fill="url(#clicksGradient)"
                />

                <path
                  d={clicksPath}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={viewsPath}
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {tooltipVisible && svgContainerRef.current && (
                  <>
                    <line
                      x1={
                        (tooltipPosition.x /
                          (svgContainerRef.current.offsetWidth || svgWidth)) *
                        svgWidth
                      }
                      y1="0"
                      x2={
                        (tooltipPosition.x /
                          (svgContainerRef.current.offsetWidth || svgWidth)) *
                        svgWidth
                      }
                      y2={svgHeight}
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={
                        (tooltipPosition.x /
                          (svgContainerRef.current.offsetWidth || svgWidth)) *
                        svgWidth
                      }
                      cy={tooltipPosition.svgYViews}
                      r="5"
                      fill="#8B5CF6"
                      stroke="#1E293B"
                      strokeWidth="2"
                    />
                    <circle
                      cx={
                        (tooltipPosition.x /
                          (svgContainerRef.current.offsetWidth || svgWidth)) *
                        svgWidth
                      }
                      cy={tooltipPosition.svgYClicks}
                      r="5"
                      fill="#10B981"
                      stroke="#1E293B"
                      strokeWidth="2"
                    />
                  </>
                )}
              </svg>

              {tooltipVisible && svgContainerRef.current && (
                <div
                  className="absolute bg-slate-700 rounded-lg shadow-xl p-3 text-xs z-20 transition-all duration-150 ease-out pointer-events-none"
                  style={{
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y}px`,
                    transform: `translateY(-50%) translateX(${tooltipPosition.flip ? "calc(-100% - 12px)" : "12px"})`,
                    minWidth: "160px",
                  }}
                >
                  <p className="text-slate-400 font-medium mb-2 text-center">
                    {tooltipMonth} Overview
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-2.5 h-2.5 bg-purple-500 rounded-full mr-1.5"></span>
                        <span className="text-slate-300">Views</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold text-white mr-1.5">
                          {tooltipViews.toLocaleString()}
                        </span>
                        <span
                          className={`font-semibold ${viewsPercentageChange > 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {viewsPercentageChange > 0 ? (
                            <ChevronUp className="inline -mt-0.5" />
                          ) : (
                            <ChevronDown className="inline -mt-0.5" />
                          )}
                          {Math.abs(viewsPercentageChange)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-1.5"></span>
                        <span className="text-slate-300">Clicks</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold text-white mr-1.5">
                          {tooltipClicks.toLocaleString()}
                        </span>
                        <span
                          className={`font-semibold ${clicksPercentageChange > 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {clicksPercentageChange > 0 ? (
                            <ChevronUp className="inline -mt-0.5" />
                          ) : (
                            <ChevronDown className="inline -mt-0.5" />
                          )}
                          {Math.abs(clicksPercentageChange)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          <motion.div
            className="flex justify-between text-slate-500 text-xs sm:text-sm mt-3 pl-[calc(theme(spacing.3)+theme(spacing.0))] sm:pl-[calc(theme(spacing.4)+theme(spacing.0))]"
            variants={itemVariants}
          >
            {monthLabels.map((month, index) => (
              <span key={month} className="flex-1 text-center leading-none">
                {month}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsDashboard;
