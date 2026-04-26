/**
 * RetryStrategy.js
 * Implementation of Exponential Backoff for auto-healing connections.
 */

class RetryStrategy {
  /**
   * @param {number} maxRetries Maximum number of attempts
   * @param {number} baseDelay Initial delay in milliseconds
   */
  constructor(maxRetries = 5, baseDelay = 1000) {
    this.maxRetries = maxRetries;
    this.baseDelay = baseDelay;
    this.attempts = 0;
  }

  /**
   * Calculates the next delay and increments attempts.
   * Logic: delay = baseDelay * (2 ^ attempts)
   * @returns {number|null} Delay in ms, or null if max retries reached
   */
  getNextDelay() {
    if (this.attempts >= this.maxRetries) {
      return null;
    }
    
    const delay = this.baseDelay * Math.pow(2, this.attempts);
    this.attempts++;
    return delay;
  }

  reset() {
    this.attempts = 0;
  }

  /**
   * Utility to wait for the calculated delay
   */
  async waitForRetry() {
    const delay = this.getNextDelay();
    if (delay === null) throw new Error("Maximum retry attempts reached");
    
    console.log(`Waiting ${delay}ms before next retry (Attempt ${this.attempts})...`);
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

export default RetryStrategy;
