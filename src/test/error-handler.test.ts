import { describe, it, expect } from "vitest";
import {
  createAppError,
  handleHttpError,
  handleFetchError,
  getErrorMessage,
  isNetworkError,
  isRetryableError,
  ErrorType,
} from "@/lib/error-handler";

describe("error-handler", () => {
  describe("createAppError", () => {
    it("should create an error with correct properties", () => {
      const error = createAppError("Test error", ErrorType.NETWORK, {
        statusCode: 500,
        isRetryable: true,
      });

      expect(error.message).toBe("Test error");
      expect(error.type).toBe(ErrorType.NETWORK);
      expect(error.statusCode).toBe(500);
      expect(error.isRetryable).toBe(true);
    });

    it("should have default retryable value", () => {
      const error = createAppError("Test error", ErrorType.NETWORK);
      expect(error.isRetryable).toBe(true);
    });

    it("should set isRetryable to false for AUTH errors", () => {
      const error = createAppError("Unauthorized", ErrorType.AUTH);
      expect(error.isRetryable).toBe(false);
    });
  });

  describe("handleHttpError", () => {
    it("should create validation error for 400 status", () => {
      const error = handleHttpError(400);
      expect(error.type).toBe(ErrorType.VALIDATION);
      expect(error.statusCode).toBe(400);
    });

    it("should create auth error for 401 status", () => {
      const error = handleHttpError(401);
      expect(error.type).toBe(ErrorType.AUTH);
      expect(error.isRetryable).toBe(false);
    });

    it("should create auth error for 403 status", () => {
      const error = handleHttpError(403);
      expect(error.type).toBe(ErrorType.AUTH);
    });

    it("should create client error for 404 status", () => {
      const error = handleHttpError(404);
      expect(error.type).toBe(ErrorType.CLIENT);
      expect(error.isRetryable).toBe(false);
    });

    it("should create server error for 500 status", () => {
      const error = handleHttpError(500);
      expect(error.type).toBe(ErrorType.SERVER);
      expect(error.isRetryable).toBe(true);
    });

    it("should create server error for 502 status", () => {
      const error = handleHttpError(502);
      expect(error.type).toBe(ErrorType.SERVER);
    });

    it("should create server error for 503 status", () => {
      const error = handleHttpError(503);
      expect(error.type).toBe(ErrorType.SERVER);
    });

    it("should handle unknown status codes", () => {
      const error = handleHttpError(418);
      expect(error.type).toBe(ErrorType.UNKNOWN);
    });
  });

  describe("handleFetchError", () => {
    it("should create network error for TypeError", () => {
      const error = new TypeError("Failed to fetch");
      const result = handleFetchError(error);
      expect(result.type).toBe(ErrorType.NETWORK);
    });

    it("should handle AbortError", () => {
      const error = new DOMException("Aborted", "AbortError");
      const result = handleFetchError(error);
      expect(result.isRetryable).toBe(false);
    });

    it("should handle unknown errors", () => {
      const result = handleFetchError("Unknown error");
      expect(result.type).toBe(ErrorType.UNKNOWN);
    });
  });

  describe("getErrorMessage", () => {
    it("should return message from AppError", () => {
      const error = createAppError("App error", ErrorType.NETWORK);
      expect(getErrorMessage(error)).toBe("App error");
    });

    it("should return message from regular Error", () => {
      const error = new Error("Regular error");
      expect(getErrorMessage(error)).toBe("Regular error");
    });

    it("should return default message for unknown errors", () => {
      expect(getErrorMessage(null)).toBe("发生未知错误");
      expect(getErrorMessage(undefined)).toBe("发生未知错误");
    });
  });

  describe("isNetworkError", () => {
    it("should return true for network errors", () => {
      const error = createAppError("Network error", ErrorType.NETWORK);
      expect(isNetworkError(error)).toBe(true);
    });

    it("should return false for non-network errors", () => {
      const error = createAppError("Server error", ErrorType.SERVER);
      expect(isNetworkError(error)).toBe(false);
    });
  });

  describe("isRetryableError", () => {
    it("should return true for retryable errors", () => {
      const error = createAppError("Network error", ErrorType.NETWORK, {
        isRetryable: true,
      });
      expect(isRetryableError(error)).toBe(true);
    });

    it("should return false for non-retryable errors", () => {
      const error = createAppError("Auth error", ErrorType.AUTH, {
        isRetryable: false,
      });
      expect(isRetryableError(error)).toBe(false);
    });

    it("should return true for unknown errors by default", () => {
      expect(isRetryableError(new Error("test"))).toBe(true);
    });
  });
});
