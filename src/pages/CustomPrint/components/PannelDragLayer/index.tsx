import React, { useMemo } from 'react';
import { DraggabeType, snapToGrid } from '@/pages/CustomPrint/contanst';
import { useDragLayer, XYCoord } from 'react-dnd';
import styles from './index.less';
import { DragItemType } from '../LeftPannel';
import PreviewText from '../PreviewText';

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  isSnapToGrid?: boolean,
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;

  if (isSnapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

interface DragLayerProps {
  /** 是否安照栅格拖拽 */
  snapToGrid?: boolean;
}

const PannleDragLayer: React.FC<DragLayerProps> = props => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
    sourceClinetOffset,
  } = useDragLayer(monitor => ({
    item: monitor.getItem() as DragItemType,
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getClientOffset(),
    sourceClinetOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const Comp = useMemo(() => {
    if (!item) {
      return null;
    }
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

  return (
    <div className={styles.layerWrapper}>
      <div
        style={getItemStyles(
          initialOffset,
          itemType === DraggabeType.PANNELITEM
            ? currentOffset
            : sourceClinetOffset,
          itemType === DraggabeType.CANVANSITEM,
        )}
      >
        {Comp}
      </div>
    </div>
  );
};

export default PannleDragLayer;
