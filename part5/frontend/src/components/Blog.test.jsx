import { render, screen } from "@testing-library/react";
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

test("shows title and author, url and likes after click on show button", async () => {
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

test("calls the like handler twice when like button is clicked twice", async () => {
  const blog = {
    title: "new Blog",
    author: "author1235434",
    url: "url",
    likes: 15,
  };

  const handleLike = vi.fn();
  const user = userEvent.setup();

  render(<Blog blog={blog} handleLike={handleLike} />);

  const showButton = screen.getByText("show");
  await user.click(showButton);

  const likeButton = screen.getByText("like");

  await user.click(likeButton);
  await user.click(likeButton);

  console.log(handleLike.mock.calls);

  expect(handleLike.mock.calls).toHaveLength(2);
});
