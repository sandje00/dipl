export default function useDragAndDrop() {
  const toggleDraggable = event => {
    event.target.draggable = !event.target.draggable;
  }

  const onDragStart = (event, itemId) => {
    toggleDraggable(event);
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('item', itemId.toString());
  };

  const onDragEnd = event => toggleDraggable(event);

  const onDrop = (event, action) => {
    const itemId = parseInt(event.dataTransfer.getData('item'));
    action(itemId);
  };

  return {
    toggleDraggable,
    onDragStart,
    onDragEnd,
    onDrop
  };
}
