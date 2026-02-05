import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("shows title and author, but not url or likes by default", () => {
  const blog = {
    title: "new Blog",
    author: "author1235434",
    url: "http://example.com",
    likes: 14,
  };

  const { container } = render(<Blog blog={blog} />);

  // Título y autor visibles
  expect(screen.getByText("new Blog")).toBeInTheDocument();
  expect(screen.getByText("author1235434")).toBeInTheDocument();

  // URL y likes NO visibles por defecto
  const urlElement = container.querySelector(".blog-url");
  const likesElement = container.querySelector(".blog-likes");

  expect(urlElement).not.toBeVisible();
  expect(likesElement).not.toBeVisible();
});
