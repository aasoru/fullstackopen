const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");

describe("most likes", () => {
  test("author with most likes", () => {
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
        author: "author2",
        url: "url",
        likes: 4,
        id: "695d94cf134d90dfc8b4dffd",
      },
    ];
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, { author: "author2", likes: 4 });
  });
});
