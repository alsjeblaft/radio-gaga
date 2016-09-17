const EventEmitter = require('events')
class EventBus extends EventEmitter {}
export default new EventBus()
