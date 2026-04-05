import { describe, it, expect, beforeEach } from "vitest";
import i18n from "@/i18n";
import { languages } from "@/i18n";

describe("i18n initialization", () => {
  beforeEach(async () => {
    await i18n.changeLanguage("en");
  });

  it("should have default language set to English", () => {
    expect(i18n.language).toBe("en");
  });

  it("should be able to change language to Chinese", async () => {
    await i18n.changeLanguage("zh");
    expect(i18n.language).toBe("zh");
  });

  it("should be able to change language to Japanese", async () => {
    await i18n.changeLanguage("ja");
    expect(i18n.language).toBe("ja");
  });

  it("should be able to change language to Korean", async () => {
    await i18n.changeLanguage("ko");
    expect(i18n.language).toBe("ko");
  });

  it("should support Chinese translations", async () => {
    await i18n.changeLanguage("zh");
    const translation = i18n.t("home.welcome");
    expect(translation).toBe("欢迎使用");
  });

  it("should support English translations", async () => {
    const translation = i18n.t("home.welcome");
    expect(translation).toBe("Welcome to");
  });

  it("should have all supported languages configured", () => {
    const languageCodes = languages.map((l) => l.code);
    expect(languageCodes).toContain("en");
    expect(languageCodes).toContain("zh");
    expect(languageCodes).toContain("ja");
    expect(languageCodes).toContain("ko");
  });
});
