import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import size from '../../commons/styles/size';

class ChartLearnedContent extends React.PureComponent {

  generateData() {
    const { learnContensByBrach, learnContens } = this.props;
    const colors = ['#0088b8', '#ba3965', '#f9b000', '#2f9c37'];
    return learnContensByBrach.map((learnedContent, index) => {
      return {
              key: index,
              amount: ((learnedContent.total_contents_learnt * 100) / learnContens).toFixed(0),
              svg: { fill: colors[index] }
            };
    });
  }

  render() {

    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
          <Text
            key={index}
            x={labelCentroid[ 0 ]}
            y={labelCentroid[ 1 ]}
            fill={'white'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={8}
            stroke={'white'}
            strokeWidth={0.1}
          >
            {data.amount + '%'}
          </Text>
        )
      })
    }

    return (
      <PieChart
        style={{ height: size.sizeChart }}
        valueAccessor={({ item }) => item.amount}
        data={this.generateData()}
        spacing={0}
        outerRadius={'95%'}
      >
        <Labels/>
      </PieChart>
    )
  }

}

export default ChartLearnedContent;