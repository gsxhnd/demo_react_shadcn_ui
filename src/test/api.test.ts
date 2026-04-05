import { describe, it, expect } from "vitest";
import { createPaginationParams } from "@/lib/api";

describe("api helper functions", () => {
  describe("createPaginationParams", () => {
    it("should create pagination params with defaults", () => {
      const params = createPaginationParams();
      expect(params.page).toBe(1);
      expect(params.pageSize).toBe(10);
    });

    it("should create pagination params with custom values", () => {
      const params = createPaginationParams(2, 20);
      expect(params.page).toBe(2);
      expect(params.pageSize).toBe(20);
    });
  });
});
