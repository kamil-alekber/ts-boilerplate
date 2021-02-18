import assert from "assert";

describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return false when the value is not present", function () {
      assert.strictEqual([1, 2, 3].includes(5), false);
    });
  });
});
