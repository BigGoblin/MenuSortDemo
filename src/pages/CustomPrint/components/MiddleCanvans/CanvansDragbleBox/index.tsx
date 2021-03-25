import { DraggabeType } from '@/pages/CustomPrint/contanst';
import { Resizable } from 're-resizable';
import React, { useEffect, useMemo } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragItemType } from '../../LeftPannel';
import PreviewText from '../../PreviewText';
import styles from './index.less';

interface CanvansDragbleBoxProps {
  item: DragItemType;
}

const CanvansDragbleBox: React.FC<CanvansDragbleBoxProps> = props => {
  const { item } = props;
  const Comp = useMemo(() => {
    switch (item.compType) {
      case 'input':
      case 'date':
      case 'number': {
        return <PreviewText {...item} />;
      }
      default: {
        return null;
      }
    }
  }, [item]);

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: DraggabeType.CANVANSITEM, ...item },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <Resizable
      bounds={document.getElementById('custom-print')!}
      className={styles.box}
      style={{
        border: 'solid 1px #ddd',
        background: '#f0f0f0',
        top: item.y ?? undefined,
        left: item.x ?? undefined,
        opacity: isDragging ? 0.6 : 1,
      }}
      defaultSize={{
        width: 320,
        height: 200,
      }}
      enable={{
        right: true,
        bottom: true,
        bottomRight: true,
        top: false,
        left: false,
        topRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <div
        ref={drag}
        className={styles.inner}
        style={{
          top: item.y ?? undefined,
          left: item.x ?? undefined,
          opacity: isDragging ? 0.6 : 1,
        }}
      >
        {Comp}
      </div>
    </Resizable>
  );
};

export default CanvansDragbleBox;
