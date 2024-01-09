import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Svg, Circle, Text as SvgText } from 'react-native-svg'; // Import Text as SvgText

const MetricClock = () => {
  const [metricTime, setMetricTime] = useState('00');
  const [strokeDashoffset, setStrokeDashoffset] = useState('565.48');
  const clockRadius = 150;
  const clockStrokeWidth = 15;
  const clockPosX = Dimensions.get('window').width/2;
  const clockPosY = Dimensions.get('window').height/2;
  const circumference = 2 * Math.PI * clockRadius;
  const [startTime, setStartTime] = useState(6); // Default start time is 6 AM _________
  const startTimeRef = useRef(startTime);
  const hours = [3, 4, 5, 6, 7, 8, 9, 10, 11]; // Array of available start times _________

  useEffect(() => {
    startTimeRef.current = startTime;
  }, [startTime]);

  useEffect(() => {
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertToMetricTime = () => {
    const now = new Date();
    let start = new Date();
    start.setHours(startTimeRef.current, 0, 0); 

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

  
  const changeStartTime = (direction) => {
    let currentIndex = hours.indexOf(startTime);
    if (direction === 'left') {
      currentIndex = currentIndex === 0 ? hours.length - 1 : currentIndex - 1;
    } else {
      currentIndex = currentIndex === hours.length - 1 ? 0 : currentIndex + 1;
    }
    setStartTime(hours[currentIndex]);
    updateClock();
  };
  


  return (
    <View style={styles.container}>
      <Svg height="70%" width="100%">
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
      <View style={styles.timerChanger}>
        <TouchableOpacity onPress={() => changeStartTime('left')}>
          <Text style={styles.arrowText}>{"⫷"}</Text>
        </TouchableOpacity>
        <Text style={styles.hourText}>{`${startTime} AM`}</Text>
        <TouchableOpacity onPress={() => changeStartTime('right')}>
          <Text style={styles.arrowText}>{"⫸"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
    timerChanger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    arrowText: {
      fontSize: 24,
      color: "#aad",
      marginHorizontal: 20,
    },
    hourText: {
      fontSize: 24,
      color: "#aad",
    },
  
});

export default MetricClock;
