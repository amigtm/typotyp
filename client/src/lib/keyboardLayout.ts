export interface KeyDef {
  code: string
  main: string
  shift?: string
  width: number
  kind: 'char' | 'special'
}

const char = (code: string, main: string, shift?: string): KeyDef => ({
  code,
  main,
  shift,
  width: 1,
  kind: 'char',
})

export const KEYBOARD_ROWS: KeyDef[][] = [
  [
    char('Backquote', '`', '~'),
    char('Digit1', '1', '!'),
    char('Digit2', '2', '@'),
    char('Digit3', '3', '#'),
    char('Digit4', '4', '$'),
    char('Digit5', '5', '%'),
    char('Digit6', '6', '^'),
    char('Digit7', '7', '&'),
    char('Digit8', '8', '*'),
    char('Digit9', '9', '('),
    char('Digit0', '0', ')'),
    char('Minus', '-', '_'),
    char('Equal', '=', '+'),
    { code: 'Backspace', main: '⌫', width: 2, kind: 'special' },
  ],
  [
    { code: 'Tab', main: '⇥', width: 1.5, kind: 'special' },
    char('KeyQ', 'q'),
    char('KeyW', 'w'),
    char('KeyE', 'e'),
    char('KeyR', 'r'),
    char('KeyT', 't'),
    char('KeyY', 'y'),
    char('KeyU', 'u'),
    char('KeyI', 'i'),
    char('KeyO', 'o'),
    char('KeyP', 'p'),
    char('BracketLeft', '[', '{'),
    char('BracketRight', ']', '}'),
    char('Backslash', '\\', '|'),
  ],
  [
    { code: 'CapsLock', main: '⇪', width: 1.8, kind: 'special' },
    char('KeyA', 'a'),
    char('KeyS', 's'),
    char('KeyD', 'd'),
    char('KeyF', 'f'),
    char('KeyG', 'g'),
    char('KeyH', 'h'),
    char('KeyJ', 'j'),
    char('KeyK', 'k'),
    char('KeyL', 'l'),
    char('Semicolon', ';', ':'),
    char('Quote', "'", '"'),
    { code: 'Enter', main: '↵', width: 2.2, kind: 'special' },
  ],
  [
    { code: 'ShiftLeft', main: '⇧', width: 2.4, kind: 'special' },
    char('KeyZ', 'z'),
    char('KeyX', 'x'),
    char('KeyC', 'c'),
    char('KeyV', 'v'),
    char('KeyB', 'b'),
    char('KeyN', 'n'),
    char('KeyM', 'm'),
    char('Comma', ',', '<'),
    char('Period', '.', '>'),
    char('Slash', '/', '?'),
    { code: 'ShiftRight', main: '⇧', width: 2.8, kind: 'special' },
  ],
  [
    { code: 'ControlLeft', main: '⌃', width: 1.5, kind: 'special' },
    { code: 'AltLeft', main: '⌥', width: 1.25, kind: 'special' },
    { code: 'Space', main: 'space', width: 4, kind: 'special' },
    { code: 'AltRight', main: '⌥', width: 1.25, kind: 'special' },
    { code: 'ControlRight', main: '⌃', width: 1.5, kind: 'special' },
  ],
]
