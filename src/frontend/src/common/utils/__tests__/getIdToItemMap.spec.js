import { getIdToItemMap } from "../getIdToItemMap";

describe("getIdToItemMap", () => {
  it("returns {} if passed empty items array", () => {
    expect(getIdToItemMap([])).toEqual({});
  });

  it("returns correct value with default id key", () => {
    const result = {
      id1: { id: "id1", value: "value1" },
      id2: { id: "id2", value: "value2" },
    };
    expect(
      getIdToItemMap([
        { id: "id1", value: "value1" },
        { id: "id2", value: "value2" },
      ])
    ).toEqual(result);
  });

  it("returns correct value with custom id key", () => {
    const result = {
      itemId1: { itemId: "itemId1", prop: "prop1" },
      itemId2: { itemId: "itemId2", prop: "prop2" },
    };
    expect(
      getIdToItemMap(
        [
          { itemId: "itemId1", prop: "prop1" },
          { itemId: "itemId2", prop: "prop2" },
        ],
        "itemId"
      )
    ).toEqual(result);
  });
});
