import { SingleTon } from "../Base/SingleTon";
import { ENUM_EVENT } from "../Reference/Enum";

interface IItem {
  func: Function;
  ctx: unknown;
}

export class EventBus extends SingleTon {
  static get instance() {
    return super.getInstance<EventBus>();
  }

  private eventDic: Map<string, Array<IItem>> = new Map();

  on(eventName: ENUM_EVENT, func: Function, ctx?: unknown) {
    let _eventName = eventName.toString();
    if (this.eventDic.has(_eventName)) {
      this.eventDic.get(_eventName).push({ func, ctx });
    } else {
      this.eventDic.set(_eventName, [{ func, ctx }]);
    }
  }

  off(eventName: ENUM_EVENT, func: Function) {
    let _eventName = eventName.toString();
    if (this.eventDic.has(_eventName)) {
      const index = this.eventDic
        .get(_eventName)
        .findIndex((i) => i.func === func);
      index > -1 && this.eventDic.get(_eventName).splice(index, 1);
    }
  }

  emit(eventName: ENUM_EVENT, ...params: unknown[]) {
    let _eventName = eventName.toString();
    if (this.eventDic.has(_eventName)) {
      this.eventDic.get(_eventName).forEach(({ func, ctx }) => {
        ctx ? func.apply(ctx, params) : func(...params);
      });
    }
  }

  clear() {
    this.eventDic.clear();
  }
}
