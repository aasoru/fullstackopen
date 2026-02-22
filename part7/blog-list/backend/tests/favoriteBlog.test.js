const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");

describe("favorite blog", () => {
  test("when list has only one blog, return that blog", () => {
    const blogs = [
      {
        id: "695d94cf134d90dfc8b4dffd",
        title: "title1",
        author: "author",
        url: "url",
        likes: 1,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: "title1",
      author: "author",
      url: "url",
      likes: 1,
      id: "695d94cf134d90dfc8b4dffd",
    });
  });

  test("of a bigger list, return the correct blog", () => {
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
    ];
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: "title2",
      author: "author",
      url: "url",
      likes: 2,
      id: "695d94cf134d90dfc8b4dffd",
    });
  });
});
