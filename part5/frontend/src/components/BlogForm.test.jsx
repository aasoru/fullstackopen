import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText("write title here");
  const inputAuthor = screen.getByPlaceholderText("write author here");
  const inputUrl = screen.getByPlaceholderText("write url here");

  const sendButton = screen.getByText("create");

  await user.type(inputTitle, "new blog created");
  await user.type(inputAuthor, "author test");
  await user.type(inputUrl, "url.com");

  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);

  expect(createBlog.mock.calls[0][0].title).toBe("new blog created");
  expect(createBlog.mock.calls[0][0].author).toBe("author test");
  expect(createBlog.mock.calls[0][0].url).toBe("url.com");
});
