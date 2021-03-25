import React from 'react';
import { Rnd } from 'react-rnd';
import { DragItemType } from '../../LeftPannel';

interface RndBoxProps {
  item: DragItemType;
  onDragStop: (id: string, pos: { x: number; y: number }) => void;
  handleResizeStop: (
    id: string,
    pos: { x: number; y: number },
    size: { width: number; height: number },
  ) => void;
}

const RndBox: React.FC<RndBoxProps> = props => {
  const { item, onDragStop, handleResizeStop } = props;

  return (
    <Rnd
      bounds="parent"
      position={{ x: item.x!, y: item.y! }}
      size={{ width: item.width!, height: item.height! }}
      onDragStop={(_, d) => {
        onDragStop(item.id, d);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        const size = {
          width: item.width! + delta.width,
          height: item.height! + delta.height,
        };

        handleResizeStop(item.id, position, size);
      }}
      dragGrid={[8, 8]}
      resizeGrid={[8, 8]}
    >
      <div style={{ background: 'red', height: '100%' }}>123</div>
    </Rnd>
  );
};

export default RndBox;
