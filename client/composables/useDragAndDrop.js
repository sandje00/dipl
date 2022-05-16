export default function useDragAndDrop() {
  const startDrag = (event, itemId) => {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('item', itemId.toString());
  };

  const onDrop = (event, action) => {
    const itemId = parseInt(event.dataTransfer.getData('item'));
    action(itemId);
  };

  return { startDrag, onDrop };
}
