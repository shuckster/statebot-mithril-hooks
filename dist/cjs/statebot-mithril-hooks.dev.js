
/*
 * Statebot Mithril Hooks
 * v1.1.0
 * https://shuckster.github.io/statebot/
 * License: ISC
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mithrilHooks = require('mithril-hooks');
var statebot = require('statebot');

function useStatebot (bot) {
  const [state, setState] = mithrilHooks.useState(bot.currentState());
  mithrilHooks.useEffect(() => {
    let done = false;
    const removeListener = bot.onSwitched(toState => {
      if (!done) {
        setState(toState);
      }
    });
    return () => {
      done = true;
      removeListener();
    }
  }, [bot]);
  return state
}
function useStatebotFactory (name, config) {
  const { bot, listeners } = mithrilHooks.useMemo(() => {
    const {
      performTransitions = {},
      onTransitions = {},
      ...botConfig
    } = config || {};
    const bot = statebot.Statebot(name, botConfig);
    const listeners = [
      bot.performTransitions(performTransitions),
      bot.onTransitions(onTransitions)
    ];
    return {
      bot,
      listeners
    }
  }, []);
  mithrilHooks.useEffect(() =>
    () => {
      if (typeof bot.pause === 'function') {
        bot.pause();
      }
      listeners.forEach(off => off());
    },
    [bot, listeners]
  );
  const state = useStatebot(bot);
  return { state, bot }
}
function useStatebotEvent (bot, eventName, stateOrFn, maybeFn) {
  mithrilHooks.useEffect(() => {
    let done = false;
    function onSwitchFn(...args) {
      if (!done) {
        stateOrFn(...args);
      }
    }
    function onEnterOrExitFn(...args) {
      if (!done) {
        maybeFn(...args);
      }
    }
    const args = typeof maybeFn === 'function'
      ? [stateOrFn, onEnterOrExitFn]
      : [onSwitchFn];
    const removeListener = bot[eventName](...args);
    return () => {
      done = true;
      removeListener();
    }
  }, [bot, eventName, stateOrFn, maybeFn]);
}

exports.useStatebot = useStatebot;
exports.useStatebotEvent = useStatebotEvent;
exports.useStatebotFactory = useStatebotFactory;
//# sourceMappingURL=statebot-mithril-hooks.dev.js.map
