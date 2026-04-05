import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLoadingState, useDelayedLoading } from "@/components/ui/loading";

describe("loading hooks", () => {
  describe("useLoadingState", () => {
    it("should initialize with idle state", () => {
      const { result } = renderHook(() => useLoadingState());
      expect(result.current.state).toBe("idle");
      expect(result.current.isIdle).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it("should start loading", () => {
      const { result } = renderHook(() => useLoadingState());

      act(() => {
        result.current.startLoading("Loading...");
      });

      expect(result.current.state).toBe("loading");
      expect(result.current.isLoading).toBe(true);
      expect(result.current.message).toBe("Loading...");
    });

    it("should set success state", () => {
      const { result } = renderHook(() => useLoadingState());

      act(() => {
        result.current.startLoading();
        result.current.setSuccess("Success!");
      });

      expect(result.current.state).toBe("success");
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.message).toBe("Success!");
    });

    it("should set error state", () => {
      const { result } = renderHook(() => useLoadingState());

      act(() => {
        result.current.setError(new Error("Something went wrong"));
      });

      expect(result.current.state).toBe("error");
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeInstanceOf(Error);
    });

    it("should reset to initial state", () => {
      const { result } = renderHook(() => useLoadingState("loading"));

      act(() => {
        result.current.startLoading();
        result.current.reset();
      });

      expect(result.current.state).toBe("loading");
    });
  });

  describe("useDelayedLoading", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    it("should not show loader immediately", () => {
      const { result } = renderHook(() => useDelayedLoading(true, 300));
      expect(result.current).toBe(false);
    });

    it("should show loader after delay", () => {
      const { result } = renderHook(() => useDelayedLoading(true, 300));

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current).toBe(true);
    });

    it("should hide loader when loading stops", () => {
      const { result, rerender } = renderHook(
        ({ isLoading }) => useDelayedLoading(isLoading, 300),
        { initialProps: { isLoading: true } },
      );

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current).toBe(true);

      rerender({ isLoading: false });
      expect(result.current).toBe(false);
    });
  });
});
