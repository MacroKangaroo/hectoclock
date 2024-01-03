import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle, Text as SvgText } from 'react-native-svg'; // Import Text as SvgText

const MetricClock = () => {
  const [metricTime, setMetricTime] = useState('00');
  const [strokeDashoffset, setStrokeDashoffset] = useState('565.48');
  const circumference = 2 * Math.PI * 90; // Circumference of the circle

  useEffect(() => {
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertToMetricTime = () => {
    const now = new Date();
    let start = new Date();
    start.setHours(7, 0, 0); // Set start time to 7 AM

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
      <Svg height="200" width="200">
        <Circle
          cx="100"
          cy="100"
          r="90"
          stroke="#ddd"
          strokeWidth="12"
          fill="none"
        />
        <Circle
          cx="100"
          cy="100"
          r="90"
          stroke="#f00"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin="100, 100"
        />
        <SvgText // Use SvgText instead of Text
          x="100"
          y="100"
          fill="black"
          fontSize="40" // Adjust fontSize as needed
          fontWeight="bold" // Optional: if you want the text to be bold
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {metricTime}
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
