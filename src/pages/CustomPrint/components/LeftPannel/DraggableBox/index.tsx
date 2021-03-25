import React, { useEffect } from 'react';
import { DraggabeType } from '@/pages/CustomPrint/contanst';
import styles from './index.less';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragItemType } from '..';

interface DragableBoxProps extends DragItemType {
  //   dragType: DraggabeType.PANNELITEM;
}

const DraggableBox: React.FC<DragableBoxProps> = props => {
  const { title } = props;

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: DraggabeType.PANNELITEM, ...props },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      ref={drag}
      className={styles.box}
      style={{ opacity: isDragging ? 0.6 : 1 }}
    >
      {title}
    </div>
  );
};

export default DraggableBox;
