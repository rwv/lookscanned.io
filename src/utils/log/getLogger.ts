import { logConfig } from "./config";
import type { logType } from "./config";

export const getLogger = (prefixArray: logType[]) => {
  const logger = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log: (text: any) => {
      console.log(...getConsoleArgs(prefixArray, text));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: (text: any) => {
      console.error(...getConsoleArgs(prefixArray, text));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn: (text: any) => {
      console.warn(...getConsoleArgs(prefixArray, text));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug: (text: any) => {
      console.debug(...getConsoleArgs(prefixArray, text));
    },
  };
  return logger;
};

function getPrefixStyle(prefix: logType) {
  const config = logConfig[prefix];
  return `background: ${config.background}; color: ${config.color}; padding-right: 0.3rem; padding-left: 0.3rem;`;
}

function getPrefixText(prefix: logType) {
  const config = logConfig[prefix];
  return `%c${config.text}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getConsoleArgs(prefixArray: logType[], text: any) {
  const textPrefixs =
    prefixArray.map((prefix) => getPrefixText(prefix)).join("") + "%c";
  const prefixStyles = prefixArray.map((prefix) => getPrefixStyle(prefix));
  const textStyle = "padding-left: 0.3rem;";

  return [`${textPrefixs}${text}`, ...prefixStyles, textStyle];
}
