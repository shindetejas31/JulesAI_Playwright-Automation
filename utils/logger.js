/**
 * External library for terminal string styling
 * @module chalk
 */
const chalk = require('chalk');

/**
 * Logger utility to print formatted log messages to the console with timestamps and color-coded levels
 * @namespace logger
 */
const logger = {
  /**
   * Logs an informational message in blue
   * @function
   * @param {string} msg - The message to log
   */
  info: (msg) => {
    console.log(`${chalk.blue('[INFO]')} ${new Date().toISOString()} - ${msg}`);
  },

  /**
   * Logs a warning message in yellow
   * @function
   * @param {string} msg - The warning message to log
   */
  warn: (msg) => {
    console.warn(`${chalk.yellow('[WARN]')} ${new Date().toISOString()} - ${msg}`);
  },

  /**
   * Logs an error message in red
   * @function
   * @param {string} msg - The error message to log
   */
  error: (msg) => {
    console.error(`${chalk.red('[ERROR]')} ${new Date().toISOString()} - ${msg}`);
  },

  /**
   * Logs a success message in green
   * @function
   * @param {string} msg - The success message to log
   */
  success: (msg) => {
    console.log(`${chalk.green('[SUCCESS]')} ${new Date().toISOString()} - ${msg}`);
  },
};

/**
 * Exports the logger utility
 * @module logger
 */
module.exports = logger;
