import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle, Text as SvgText } from 'react-native-svg'; // Import Text as SvgText

const MetricClock = () => {
  const [metricTime, setMetricTime] = useState('00');
  const [strokeDashoffset, setStrokeDashoffset] = useState('565.48');
  const clockRadius = 150;
  const clockStrokeWidth = 15;
  const clockPosX = clockRadius + clockStrokeWidth / 2;
  const clockPosY = clockPosX;
  const boundingBoxWidth = clockRadius * 2 + clockStrokeWidth;
  const boundingBoxHeight = boundingBoxWidth;
  const circumference = 2 * Math.PI * clockRadius; // Circumference of the circle

  useEffect(() => {
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertToMetricTime = () => {
    const now = new Date();
    let start = new Date();
    start.setHours(6, 0, 0); // Set start time to 6 AM

    const diffInMinutes = (now - start) / 60000; // Difference in minutes
    let metricHour = Math.ceil(diffInMinutes / 10);
    
    if (metricHour < 1) return "Before Metric Time";
    if (metricHour > 100) return "After Metric Time";
    return metricHour.toString().padStart(2, '0');
  };

  const updateCircularTimer = () => {
    const now = new Date();
    const currentMinute = now.getMinutes() % 10;
    const currentSecond = now.getSeconds();
    const segmentFraction = (currentMinute * 60 + currentSecond) / 600;
    const offset = circumference * (1 - segmentFraction);
    setStrokeDashoffset(offset.toString());
  };

  const updateClock = () => {
    const metricTimeValue = convertToMetricTime();
    setMetricTime(metricTimeValue);
    updateCircularTimer();
  };

  return (
    <View style={styles.container}>
      <Svg height={boundingBoxHeight} width={boundingBoxWidth}>
        <Circle
          cx={clockPosX}
          cy={clockPosY}
          r={clockRadius}
          stroke="#ddd"
          strokeWidth={clockStrokeWidth}
          fill="none"
        />
        <Circle
          cx={clockPosX}
          cy={clockPosY}
          r={clockRadius}
          stroke="#f00"
          strokeWidth={clockStrokeWidth}
          fill="none"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          rotation="-90"
          origin={clockPosX + ", " + clockPosY}
        />
        <SvgText
          x={clockPosX}
          y={clockPosY + 5}
          fill="black"
          fontSize="90"
          fontWeight="bold"
          fontFamily="helvetica"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {metricTime}
        </SvgText>
        <SvgText
          x={clockPosX + 60}
          y={clockPosY + 20}
          fill="black"
          fontSize="20"
          fontFamily="helvetica"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          %
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  // Other styles if necessary
});

export default MetricClock;
