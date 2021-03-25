import React from 'react';
import DndProvider from '../SiderDemo.tsx/DndProvider';
import LeftPannel from './components/LeftPannel';
import MiddleCanvans from './components/MiddleCanvans';
import PannleDragLayer from './components/PannelDragLayer';
import styles from './index.less';

const CustomPrint: React.FC = () => {
  return (
    <DndProvider>
      <div className={styles.content}>
        <LeftPannel />
        <MiddleCanvans />
        <div className={styles.contentRight}></div>
        <PannleDragLayer />
      </div>
    </DndProvider>
  );
};

export default CustomPrint;
