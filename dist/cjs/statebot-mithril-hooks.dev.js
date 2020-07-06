
/*
 * Statebot Mithril Hooks
 * v1.0.1
 * https://shuckster.github.io/statebot/
 * License: ISC
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mithrilHooks = require('mithril-hooks');
var statebot = require('statebot');

function useStatebot(bot) {
  const [state, setState] = mithrilHooks.useState(bot.currentState());
  mithrilHooks.useEffect(() => bot.onSwitched(setState), [bot]);
  return state
}
function useStatebotFactory(name, config) {
  const _config = mithrilHooks.useMemo(() => config, [name]);
  const listeners = [];
  mithrilHooks.useEffect(() => () => listeners.forEach(off => off()), [_config]);
  const bot = mithrilHooks.useMemo(() => {
    const { performTransitions, onTransitions, ...botConfig } = _config || {};
    const bot = statebot.Statebot(name, botConfig);
    listeners.push(
      bot.performTransitions(performTransitions || {}),
      bot.onTransitions(onTransitions || {})
    );
    return bot
  }, [name, _config]);
  const state = useStatebot(bot);
  return { state, bot }
}
function useStatebotEvent(bot, eventName, ...args) {
  const listeners = [];
  mithrilHooks.useEffect(() => () => listeners.forEach(off => off()), [bot, eventName]);
  mithrilHooks.useEffect(() => {
    if (
      [
        'onSwitching',
        'onSwitched',
        'onEntering',
        'onEntered',
        'onExiting',
        'onExited'
      ].includes(eventName)
    ) {
      listeners.push(bot[eventName](...args));
    } else {
      throw new Error(`Unknown event: ${eventName}`)
    }
  }, [bot, eventName]);
}

exports.useStatebot = useStatebot;
exports.useStatebotEvent = useStatebotEvent;
exports.useStatebotFactory = useStatebotFactory;
//# sourceMappingURL=statebot-mithril-hooks.dev.js.map
