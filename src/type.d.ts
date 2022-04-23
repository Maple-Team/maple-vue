import Watcher from "./watcher";

interface Sub extends Watcher {
  update(): Function;
}
