const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");

describe("total likes", () => {
  const listWithOneBlog = [
    {
      id: "695d94cf134d90dfc8b4dffd",
      title: "title1",
      author: "author",
      url: "url",
      likes: 1,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 1);
  });
});
