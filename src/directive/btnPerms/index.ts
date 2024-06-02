export default function btnPerms(app: any) {
  app.directive('has', {
    mounted(el: any, binding: any) {
      if (!permsJudge(binding.value)) {
        el.parentNode.removeChild(el);
      }
      function permsJudge(value: string) {
        let perms = JSON.parse(localStorage.getItem("roleNodes") as string);
        for (let item of perms) {
          if (item === value) {
            return true;
          }
        }
        return false;
      }
    }
  })
}

export function permsJudge(value: string) {
  let perms = JSON.parse(localStorage.getItem("roleNodes") as string);
  for (let item of perms) {
    if (item === value) {
      return true;
    }
  }
  return false;
}