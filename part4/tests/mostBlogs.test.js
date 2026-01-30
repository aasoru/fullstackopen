const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");

describe("most blogs", () => {
  test("return the correct author", () => {
    const blogs = [
      {
        title: "title1",
        author: "author",
        url: "url",
        likes: 1,
        id: "695d94cf134d90dfc8b4dffd",
      },
      {
        title: "title2",
        author: "author",
        url: "url",
        likes: 2,
        id: "695d94cf134d90dfc8b4dffd",
      },
      {
        title: "title3",
        author: "author",
        url: "url",
        likes: 3,
        id: "695d94cf134d90dfc8b4dffd",
      },
    ];
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, { author: "author", blogs: 3 });
  });
});
