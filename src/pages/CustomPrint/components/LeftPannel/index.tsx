import React from 'react';
import DraggableBox from './DraggableBox';
import styles from './index.less';

export interface DragItemType {
  id: string;
  title: string;
  compType: 'input' | 'number' | 'date';
  x: number | null;
  y: number | null;
  width?: number;
  height?: number;
}

const array: DragItemType[] = [
  { id: '001', title: 'TEXT A', compType: 'input', x: null, y: null },
  { id: '002', title: 'TEXT B', compType: 'number', x: null, y: null },
  { id: '003', title: 'TEXT C', compType: 'date', x: null, y: null },
];

const LeftPannel: React.FC = () => {
  return (
    <div className={styles.contentLeft}>
      {array.map(item => (
        <DraggableBox key={item.id} {...item} />
      ))}
    </div>
  );
};

export default LeftPannel;
