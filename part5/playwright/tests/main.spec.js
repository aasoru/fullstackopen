// @ts-check
const { test, expect, beforeEach, describe } = require("@playwright/test");

import { loginWith, createBlog } from "./helper";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Test User",
        username: "username",
        password: "password",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "login" }).click();

    const loginForm = page.getByTestId("login-form");
    await loginForm.click();

    await expect(loginForm).toBeVisible();
  });
  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.goto("/");

      await loginWith(page, "username", "password");

      await expect(page.getByText("logged-in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.goto("/");

      await loginWith(page, "notrealuser", "password");

      await expect(page.getByText("Wrong username or password")).toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "username", "password");
    });

    test("a new blog can be created", async ({ page }) => {
      const title = "title test";
      const author = "playwright";
      const url = "https://url.dev";

      await createBlog(page, {
        title,
        author,
        url,
      });
      await expect(
        page.getByText(`a new blog ${title} by ${author}`),
      ).toBeVisible();
    });
  });
});
