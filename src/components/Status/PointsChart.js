import React from 'react';
import { ResponsiveLine } from '@nivo/line';

export default function PointsChart({ data }) {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 30, bottom: 50, left: 40 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', stacked: true, min: 0, max: 'auto' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 1,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      colors={['#e2f700', '#01f780']}
      enableArea={true}
      areaOpacity={0.8}
      enableGridX={false}
      enableGridY={false}
      enableCrosshair={false}
      pointSize={10}
      pointColor={'#fff'}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      yFormat={value => `${value}pts`}
      enableSlices="x"
      sliceTooltip={({ slice }) => {
        return (
          <div
            style={{
              background: 'white',
              padding: '9px 12px',
              border: '1px solid #ccc',
            }}>
            {slice.points.map(point => (
              <div
                key={point.id}
                style={{
                  color: '#6f6f68',
                  padding: '3px 0',
                }}>
                {point.serieId} <strong>{point.data.yFormatted}</strong>
              </div>
            ))}
          </div>
        );
      }}
      legends={[
        {
          anchor: 'top',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: -50,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
