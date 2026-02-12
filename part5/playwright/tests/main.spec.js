// @ts-check
const { test, expect, beforeEach, describe } = require("@playwright/test");

import { loginWith, createBlog } from "./helper";

const title = "title test";
const author = "playwright";
const url = "https://url.dev";

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
      await createBlog(page, {
        title,
        author,
        url,
      });
      await expect(
        page.getByText(`a new blog ${title} by ${author}`),
      ).toBeVisible();
    });

    test("new blog can be edited", async ({ page }) => {
      const blog = page.locator(".blog").filter({
        has: page.getByText(title),
      });

      await blog.getByRole("button", { name: "show" }).click();

      const likesLocator = blog.locator(".blog-likes-number");

      const likesBefore = Number(await likesLocator.textContent());

      await blog.getByRole("button", { name: "like" }).click();

      await expect(likesLocator).toHaveText(String(likesBefore + 1));
    });

    test("new blog can be deleted", async ({ page }) => {
      const blog = page.locator(".blog").filter({
        has: page.getByText(title),
      });

      await blog.getByRole("button", { name: "show" }).click();

      page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        await dialog.accept();
      });

      await blog.getByRole("button", { name: "delete" }).click();

      await expect(blog).toHaveCount(0);
    });
  });
});
