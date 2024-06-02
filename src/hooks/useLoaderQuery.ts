
const useDataLoader = (api: (params: any) => Promise<any>, params: any) => {
  const loading = ref(false);
  const data = ref(null);

  const loadData = async () => {
    loading.value = true;
    try {
      const response = await api(params);
      data.value = response.data;
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      loading.value = false;
    }
  };

  const reload = () => {
    loadData();
  };

  onMounted(() => {
    loadData();
  });

  return {
    loading,
    data,
    reload,
  };
};
