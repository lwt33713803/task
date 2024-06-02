import { ElMessage } from 'element-plus';

interface MessageQueueItem {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

let messageQueue: MessageQueueItem[] = []; // 用于存放消息队列
let isShowingMessage = false; // 标记是否正在显示消息

class MessageWrapper {
  success(message: string): this {
    this.showMessage('success', message);
    return this;
  }

  error(message: string): this {
    this.showMessage('error', message);
    return this;
  }

  info(message: string): this {
    this.showMessage('info', message);
    return this;
  }

  warning(message: string): this {
    this.showMessage('warning', message);
    return this;
  }

  private showMessage(type: 'success' | 'error' | 'info' | 'warning', message: string): void {
    // 将消息加入消息队列
    messageQueue.push({ type, message });

    // 如果当前已经在显示消息，则直接返回，等待下一次调用
    if (isShowingMessage) {
      return;
    }

    // 取出队列中的第一个消息并显示
    this.showNextMessage();
  }

  private showNextMessage(): void {
    // 如果队列中没有消息了，则将 isShowingMessage 设置为 false，并返回
    if (messageQueue.length === 0) {
      isShowingMessage = false;
      return;
    }

    // 取出队列中的第一个消息并显示
    const { type, message } = messageQueue.shift();

    ElMessage({
      type,
      message,
      duration: 1000, // 消息显示时间
      onClose: this.showNextMessage.bind(this), // 消息关闭后，继续显示下一个消息
    });

    // 设置 isShowingMessage 为 true，表示当前正在显示消息
    isShowingMessage = true;
  }
}
const fmsMessage = new MessageWrapper();

export default fmsMessage
