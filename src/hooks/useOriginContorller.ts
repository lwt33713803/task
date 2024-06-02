
import { PageCursor, SystemRecordloaderFunction, ElPageInstance, ElPageConfig, ElPageState, ElRecordBox, ElPageController } from '@/components/Elgroup/Elorigin/Elorgin';
import { nextTick, reactive, ref, watch } from 'vue';
export default function useElPage<D, C = undefined>(scatterLoader: SystemRecordloaderFunction<D, C>, { queryparameters = undefined, autoStart = true, pageSize = 15, smartFilterParams }: ElPageConfig<D, C>): ElPageInstance<D> {
  const recordBoxList: ElRecordBox<D>[] = reactive([]);

  const itemCount = ref<number | undefined>(undefined);
  const currentPageCursor = ref({ page: 0, list_rows: 10 });
  const dataMatchCursor = ref(false);


  async function loadCurrentPage() {
    await loadPageByPage(currentPageCursor.value);
  }

  //TODO 这里要加上防抖 conditionDebounce
  async function loadPageByPage(pageCursor: PageCursor) {
    dataMatchCursor.value = false;
    //@ts-ignore

    console.log(smartFilterParams.value, 'smartFilterParams.valuesmartFilterParams.value')
    const pageResponse = await scatterLoader({
      page: pageCursor.page,
      list_rows: pageCursor.list_rows,
      ...queryparameters?.value,
      ...smartFilterParams.value
    }, { ...queryparameters?.value, ...smartFilterParams.value });
    recordBoxList.splice(0);
    //@ts-ignore
    if (pageResponse.data) {
      if (pageResponse.data?.data) {
        pageResponse.data.data.map((record, index) => {
          //@ts-ignore
          recordBoxList.push({ ...record });
        });
      } else {
        pageResponse.data.map((record, index) => {
          //@ts-ignore
          recordBoxList.push({ ...record });
        });
      }

    } else {
      pageResponse.map((record, index) => {
        //@ts-ignore
        recordBoxList.push({ ...record });
      });
    }

    dataMatchCursor.value = true;
    console.log(pageResponse, 'pageResponse)')

    itemCount.value = pageResponse.total;

  }

  //TODO 这里要加上防抖 conditionDebounce
  async function loadPageByPageNoSmartFilter(pageCursor: PageCursor) {
    dataMatchCursor.value = false;
    //@ts-ignore
    const pageResponse = await scatterLoader({
      page: 1,
      list_rows: pageCursor.list_rows, ...queryparameters?.value
    });
    recordBoxList.splice(0);
    //@ts-ignore
    if (pageResponse.data) {
      if (pageResponse.data?.data) {
        pageResponse.data.data.map((record, index) => {
          //@ts-ignore
          recordBoxList.push({ ...record });
        });
      } else {
        pageResponse.data.map((record, index) => {
          //@ts-ignore
          recordBoxList.push({ ...record });
        });
      }

    } else {
      pageResponse.map((record, index) => {
        //@ts-ignore
        recordBoxList.push({ ...record });
      });
    }
    dataMatchCursor.value = true;
    itemCount.value = pageResponse.total;

  }
  async function loadPageByPageSmartFilter(pageCursor: PageCursor, data: any) {
    dataMatchCursor.value = false;
    //@ts-ignore
    const pageResponse = await scatterLoader(pageCursor, { ...data });
    recordBoxList.splice(0);
    //@ts-ignore
    if (pageResponse.data) {
      if (pageResponse.data?.data) {
        pageResponse.data.data.map((record, index) => {
          //@ts-ignore
          recordBoxList.push({ ...record });
        });
      } else {
        pageResponse.data.map((record, index) => {
          //@ts-ignore
          recordBoxList.push({ ...record });
        });
      }

    } else {
      pageResponse.map((record, index) => {
        //@ts-ignore
        recordBoxList.push({ ...record });
      });
    }
    dataMatchCursor.value = true;
    itemCount.value = pageResponse.total;

  }
  const pageState: ElPageState | any = {
    itemCount,
    pageCursor: currentPageCursor,
    dataMatchCursor,
  };


  const pageController: ElPageController = {

    async refresh(holdPageIndex = false) {
      if (!holdPageIndex) {
        currentPageCursor.value.page = 1;
      }
      await loadPageByPage(currentPageCursor.value);
    },
    async refreshAll(holdPageIndex = false) {
      currentPageCursor.value.page = 1;
      await loadPageByPageNoSmartFilter(currentPageCursor.value);
    },
    async refreshFilter(holdPageIndex = false) {
      await loadPageByPageSmartFilter(currentPageCursor.value, { page: 1, list_row: 10 });
    },
    async refreshSaveDateRow(holdPageIndex = false) {
      await loadPageByPage(currentPageCursor.value);
    },
    async start() {
      await this.refresh();
    },
    async changePageSize(pageSize: number) {
      currentPageCursor.value.list_rows = pageSize;
      await this.refresh();
    },
    async changePageIndex(pageIndex: number) {
      currentPageCursor.value.page = pageIndex;
      await loadCurrentPage();
    },
  };

  if (queryparameters) {
    watch(
      () => queryparameters,
      async () => {
        await nextTick();
        await pageController.refresh();
      },
      { deep: true },
    );
  }

  if (autoStart) {
    pageController.start().catch(console.error);
  }

  return { pageController, recordBoxList, pageState };
}
