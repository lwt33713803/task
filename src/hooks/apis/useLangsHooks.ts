import { getLangs } from "@/api/system/signpage";
export default function useLangsHooks() {
  const optoionLans = ref([]);//全部项目
  const defaultLang = ref("");//默认项目
  //获取语言信息
  const getLangsForSelect = () => {
    getLangs()
      .then((res) => {
        optoionLans.value = res;
        defaultLang.value = res.filter((item) => item.is_default == 1)[0].value;
      })
      .catch((err) => {});
  };


	onMounted(async () => {
		await getLangsForSelect();
	});

  return {optoionLans,defaultLang};
}
