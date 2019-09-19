import React from 'react';
import { ResponsivePie } from '@nivo/pie';

export default function ChipsChart({ data }) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 20, bottom: 60, right: 10, left: 10 }}
      startAngle={-90}
      endAngle={90}
      innerRadius={0.5}
      padAngle={1}
      cornerRadius={3}
      colors={['#e2f700', '#04e8f7', '#01f780', '#f6247b']}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      enableRadialLabels={false}
      sliceLabel={function(e) {
        return `${e.value.toLocaleString()}`;
      }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor='#320336'
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      tooltip={function(e) {
        return `${e.label}: ${e.value.toLocaleString()}`;
      }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          itemDirection: 'top-to-bottom',
          translateY: 25,
          itemWidth: 70,
          itemHeight: 18,
          itemTextColor: '#320336',
          symbolSize: 10,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
}
