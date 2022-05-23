import { ref } from 'vue';

export default function useModal() {
  const isOpen = ref(false);
  const toggleOpen = () => isOpen.value = !isOpen.value;
  return { isOpen, toggleOpen };
}
