// here we are creating the line graph ;

import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import {Rect, Text as TextSVG, Svg} from 'react-native-svg';


const LineGraph = props => {

  const {name , label , value , keyName , } = props;
 
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    labels: 0,
  });

  return (
    <View style={styles.cont}>
      <Text style={styles.title}>{name}</Text>
      <ScrollView horizontal={true}>
        <LineChart
          data={{
            labels: label,
            datasets: [
              {
                data: value.reverse(),
              },
            ],
          }}
          width={value.length * 150} // from react-native
          height={220}
          yAxisInterval={1} // optional, defaults to 1
          withVerticalLabels={true}

          chartConfig={{
            backgroundColor: '#e3d8d9',
            backgroundGradientFrom: '#e3d8d9',
            backgroundGradientTo: '#e3d8d9',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `#0f0f0f`,
            labelColor: (opacity = 1) => `#0f0f0f`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}

          decorator={() => {
          
            return tooltipPos.visible ? (
              <View>
                <Svg>
                  <Rect
                    x={tooltipPos.x - 15}
                    y={tooltipPos.y + 10}
                    width="40"
                    height="30"
                    fill="black"
                  />
                  <TextSVG
                    x={tooltipPos.x + 5}
                    y={tooltipPos.y + 35}
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle">
                    {tooltipPos.value}
                  </TextSVG>

                  
                </Svg>
              </View>
            ) : null;
          }}

          onDataPointClick={data => {

            const index = data.index;
            const time = label[index];

            let isSamePoint =
              tooltipPos.x === data.x && tooltipPos.y === data.y;

            isSamePoint
              ? setTooltipPos(previousState => {
                  return {
                    ...previousState,
                    value: data.value,
                    labels: time,
                    visible: !previousState.visible,
                  };
                })
              : setTooltipPos({
                  x: data.x,
                  value: data.value,
                  y: data.y,
                  visible: true,
                });
          }}
        />
      </ScrollView>
    </View>
  );
};

export default LineGraph;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    width: '108%',
    borderWidth: 2,
    borderRadius: 6,
    marginLeft: '-4%',
    borderColor: 'blue',
    marginBottom: 11,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chart: {
    flex: 1,
  },
  title :{
    fontSize : 20 , paddingVertical : 6 , paddingHorizontal : 12  , fontWeight : "bold" , color : "#3b46e3"
  }
});
