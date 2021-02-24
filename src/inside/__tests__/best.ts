import assert from "assert";
import { isIncluded } from "../include";

describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return false when the value is not present", function () {
      assert.strictEqual(isIncluded(5), false);
    });
  });
});
