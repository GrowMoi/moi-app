import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

class ChartLearnedContent extends React.PureComponent {

    render() {

        const data = [

            {
                key: 1,
                amount: 23,
                svg: { fill: '#0088b8' }
            },
            {
                key: 2,
                amount: 29,
                svg: { fill: '#ba3965' }
            },
            {
                key: 3,
                amount: 22,
                svg: { fill: '#f9b000' }
            },
             {
                key: 4,
                amount: 26,
                svg: { fill: '#2f9c37' },
            }
        ]

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
                style={{ height: 77 }}
                valueAccessor={({ item }) => item.amount}
                data={data}
                spacing={0}
                outerRadius={'95%'}
            >
                <Labels/>
            </PieChart>
        )
    }


}

export default ChartLearnedContent;