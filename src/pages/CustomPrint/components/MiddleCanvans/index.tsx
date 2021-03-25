import React, { useEffect, useRef, useState } from 'react';
import { DragObjectWithType, useDrop } from 'react-dnd';
import { DraggabeType, snapToGrid } from '../../contanst';
import update from 'immutability-helper';
import styles from './index.less';
import { DragItemType } from '../LeftPannel';
import CanvansDragbleBox from './CanvansDragbleBox';
import { xor } from 'lodash';
import RndBox from './RndBox';

const transferXY = (
  clientX: number,
  clientY: number,
  ref: React.RefObject<HTMLDivElement>,
) => {
  const refTop = ref.current?.offsetTop;
  const refLeft = ref.current?.offsetLeft;
  if (refTop && refLeft) {
    // 网格
    const [x, y] = snapToGrid(clientX - refLeft, clientY - refTop);
    return {
      x,
      y,
    };
  }
};

// interface DragType  extends DragObjectWithType ,DragItemType {

// }
type DragType = DragObjectWithType & DragItemType;

const MiddleCanvans: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [list, setList] = useState<DragItemType[]>([]);

  const [, drop] = useDrop({
    accept: [
      DraggabeType.PANNELITEM,
      // DraggabeType.CANVANSITEM
    ],
    drop(item: DragType, monitor) {
      // const delta = monitor.getDifferenceFromInitialOffset() as {
      //     x: number
      //     y: number
      //   }

      if (item.type === DraggabeType.PANNELITEM) {
        const offset = monitor.getClientOffset();
        if (offset && offset.x && offset.y) {
          const position = transferXY(offset.x, offset.y, ref);
          if (position) {
            const { x, y } = position;

            // todo 右下边界
            // x + 宽 < ref.current.offsetRight && y + 高 < ref.current.offsetBottom

            const updateItem = update(item, {
              $unset: ['type'],
              id: {
                $set: String(new Date().getTime()),
              },
              x: {
                $set: x,
              },
              y: {
                $set: y,
              },
              width: {
                $set: 150,
              },
              height: {
                $set: 32,
              },
            });

            setList(
              update(list, {
                $push: [updateItem],
              }),
            );
          }
        }
      }
    },
  });
  drop(ref);

  const handleDragStop = (id: string, pos: { x: number; y: number }) => {
    const updatedItemIndex = list.findIndex(listItem => listItem.id === id);
    const { x, y } = pos;
    setList(
      update(list, {
        [updatedItemIndex]: {
          x: {
            $set: x,
          },
          y: {
            $set: y,
          },
        },
      }),
    );
  };

  const handleResizeStop = (
    id: string,
    pos: { x: number; y: number },
    size: { width: number; height: number },
  ) => {
    const updatedItemIndex = list.findIndex(listItem => listItem.id === id);
    const { x, y } = pos;
    const { width, height } = size;
    setList(
      update(list, {
        [updatedItemIndex]: {
          x: {
            $set: x,
          },
          y: {
            $set: y,
          },
          width: {
            $set: width,
          },
          height: {
            $set: height,
          },
        },
      }),
    );
  };

  useEffect(() => {
    console.log('list', list);
  }, [list]);
  return (
    <div className={styles.contentMiddle}>
      <div className={styles.toolbar}>toolbar</div>
      <div id="custom-print" ref={ref} className={styles.canvansStyle}>
        {list.map(listItem => (
          <RndBox
            key={listItem.id}
            item={listItem}
            onDragStop={handleDragStop}
            handleResizeStop={handleResizeStop}
          />
        ))}
      </div>
    </div>
  );
};

export default MiddleCanvans;
