import React, { useState, useEffect } from 'react';
import { Bar } from '@nivo/bar';

const DataGenerator = (initialIndex, initialState) => {
  let index = initialIndex;
  let state = initialState;

  return {
    increment: () => {
      index++;
      state = state.map(item => {
        const initialValue = initialState.find(d => d.id === item.id).value;

        return {
          ...item,
          value: Math.round(item.value + Math.random() * (initialValue * 0.2)),
        };
      });
    },
    getData: () => {
      return { index, state };
    },
  };
};

const dataGenerator = DataGenerator(1900, [
  { id: 'Tokyo', value: 10000000 },
  { id: 'Osaka', value: 9000000 },
  { id: 'Nara', value: 8000000 },
  { id: 'Kyoto', value: 7000000 },
  { id: 'Kobe', value: 5000000 },
  { id: 'Sapporo', value: 3000000 },
]);

const Sample = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      dataGenerator.increment();
      setCurrent(current + 1);
    }, 1400);
    return () => clearTimeout(timer);
  }, [current, setCurrent]);

  const yearData = dataGenerator.getData();
  const barData = [...yearData.state].sort((a, b) => a.value - b.value);

  return (
    <>
      <h2 style={{ marginLeft: 60, fontWeight: 400, color: '#555' }}>
        Arbitrary Value in Japan Cities{' '}
        <strong style={{ color: 'black', fontWeight: 900 }}>
          {yearData.index}
        </strong>
      </h2>
      <Bar
        width={800}
        height={500}
        layout='horizontal'
        margin={{ top: 26, right: 120, bottom: 26, left: 60 }}
        data={barData}
        indexBy='id'
        keys={['value']}
        colors={{ scheme: 'spectral' }}
        colorBy='indexValue'
        borderColor={{ from: 'color', modifiers: [['darker', 2.6]] }}
        enableGridX
        enableGridY={false}
        axisTop={{
          format: '~s',
        }}
        axisBottom={{
          format: '~s',
        }}
        axisLeft={null}
        padding={0.3}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
        isInteractive={false}
        barComponent={BarComponent}
        motionStiffness={170}
        motionDamping={26}
      />
    </>
  );
};
