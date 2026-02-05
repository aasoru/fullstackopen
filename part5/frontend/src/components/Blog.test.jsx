import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

test("shows title and author, but not url or likes by default", () => {
  const blog = {
    title: "new Blog",
    author: "author1235434",
    url: "http://example.com",
    likes: 14,
  };

  const { container } = render(<Blog blog={blog} />);

  const titleElement = container.querySelector(".blogTitle");
  const authorElement = container.querySelector(".blogAuthor");

  const urlElement = container.querySelector(".blog-url");
  const likesElement = container.querySelector(".blog-likes");

  expect(titleElement).toBeVisible();
  expect(authorElement).toBeVisible();

  expect(urlElement).not.toBeVisible();
  expect(likesElement).not.toBeVisible();
});

test("shows title and author, but not url or likes by default", async () => {
  const blog = {
    title: "new Blog",
    author: "author1235434",
    url: "http://example.com",
    likes: 14,
  };

  const user = userEvent.setup();
  const { container } = render(<Blog blog={blog} />);

  const showButton = container.querySelector(".button-show");
  await user.click(showButton);

  const titleElement = container.querySelector(".blogTitle");
  const authorElement = container.querySelector(".blogAuthor");

  const urlElement = container.querySelector(".blog-url");
  const likesElement = container.querySelector(".blog-likes");

  expect(titleElement).toBeVisible();
  expect(authorElement).toBeVisible();

  expect(urlElement).toBeVisible();
  expect(likesElement).toBeVisible();
});
