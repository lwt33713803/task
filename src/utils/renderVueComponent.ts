

import { createApp, h, App } from 'vue';

const renderVueComponent = (vm: any, container: HTMLElement) => {
  const app = createApp({
    render: () => vm
  }) as App;

  app.mount(container);
  alert(1)

};

export default renderVueComponent;