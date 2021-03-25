import React from 'react';
import { DragItemType } from '../LeftPannel';
interface PreviewTextProps extends DragItemType {
  //   dragType: DraggabeType.PANNELITEM;
}
const PreviewText: React.FC<PreviewTextProps> = props => {
  const { title } = props;
  return (
    <div>
      {title}: {'$' + title}
    </div>
  );
};

export default PreviewText;
