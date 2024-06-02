
import { ref, Ref } from 'vue';

/**
 * @description 可以接受一个对迭代器的函数来约束selectedItems返回的值
 * @returns selectedItems
 */
export function useTableSelection(filterLoader?: (filterItem: any) => void): {
  selectedItems: Ref<any[]>;
  handleSelectionChange: (selection: any[]) => void;
} {
  const selectedItems: Ref<any[]> = ref([]);

  function handleSelectionChange(selection: any[]): void {
    selectedItems.value = filterLoader ? selection.map(filterLoader) : selection
  }

  return {
    selectedItems,
    handleSelectionChange
  };
}
