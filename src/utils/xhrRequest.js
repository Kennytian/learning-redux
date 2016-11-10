export default class XhrRequest {
  static run() {
    if (__DEV__) {
      XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;
    }
  }
}
